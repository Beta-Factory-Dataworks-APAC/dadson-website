/**
 * Base URL for the PayloadCMS API
 * Falls back to http://localhost:3004 if NEXT_PUBLIC_PAYLOAD_URL is not set
 */
const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3004';

/**
 * Parameters for fetching articles from the API
 * @interface FetchArticlesParams
 * @property {number} [page=1] - Page number for pagination
 * @property {number} [limit=10] - Number of articles per page
 * @property {string} [category] - Category slug to filter articles
 * @property {string} [sortBy='publishedDate'] - Field to sort articles by
 * @property {'asc'|'desc'} [sortOrder='desc'] - Sort order (ascending or descending)
 */
interface FetchArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * API Response with fallback information
 * @interface APIResponse
 * @property {any} data - The API response data
 * @property {boolean} usingMockData - Whether the response is using mock data
 * @property {string} [error] - Error message if there was an error
 */
interface APIResponse<T> {
  data: T;
  usingMockData: boolean;
  error?: string;
}

/**
 * Logs API errors with more detailed information for debugging
 * @param {string} endpoint - The API endpoint that failed
 * @param {any} error - The error object
 * @param {any} context - Additional context for the error
 */
function logApiError(endpoint: string, error: any, context: any = {}) {
  // Create a structured log with all relevant information
  const logData = {
    timestamp: new Date().toISOString(),
    endpoint,
    errorMessage: error.message || 'Unknown error',
    errorStack: error.stack,
    status: error.status,
    context
  };
  
  // Log in development, could also send to monitoring service in production
  console.error(`API Error [${endpoint}]:`, logData);
}

/**
 * Fetches articles from PayloadCMS API with optional filtering and pagination
 * Falls back to mock API if PayloadCMS is unavailable
 * 
 * @param {FetchArticlesParams} params - Parameters for fetching articles
 * @returns {Promise<APIResponse<{docs: any[], totalPages: number, page: number}>>} Articles data with fallback info
 */
export async function fetchArticles({
  page = 1,
  limit = 10,
  category,
  sortBy = 'publishedDate',
  sortOrder = 'desc',
}: FetchArticlesParams = {}): Promise<APIResponse<{docs: any[], totalPages: number, page: number}>> {
  let url = `${API_URL}/api/articles?depth=2&page=${page}&limit=${limit}&sort=${sortBy}${sortOrder === 'desc' ? '-desc' : ''}`;
  
  // Add filters if category is provided
  if (category) {
    url += `&where[category.slug][equals]=${category}`;
  }
  
  // Add published filter
  url += `&where[status][equals]=published`;
  
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(url, { 
      next: { revalidate: 60 },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      data,
      usingMockData: false
    };
  } catch (error: any) {
    const errorContext = { url, params: { page, limit, category, sortBy, sortOrder } };
    logApiError('fetchArticles', error, errorContext);
    
    // Fall back to the local mock API if the Payload CMS connection fails
    console.log('Falling back to mock API for articles...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog${category ? `?category=${category}` : ''}`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        const data = await mockRes.json();
        return {
          data,
          usingMockData: true,
          error: `PayloadCMS Connection Failed: ${error.message}`
        };
      } else {
        throw new Error(`Mock API error: ${mockRes.status} ${mockRes.statusText}`);
      }
    } catch (mockError: any) {
      logApiError('fetchArticles [mockFallback]', mockError, { mockApiUrl });
      
      // Return empty data as last resort
      return {
        data: { docs: [], totalPages: 0, page: 1 },
        usingMockData: true,
        error: `All API attempts failed: ${error.message}, Mock API: ${mockError.message}`
      };
    }
  }
}

/**
 * Fetches a single article by its slug from PayloadCMS API
 * Falls back to mock API if PayloadCMS is unavailable
 * 
 * @param {string} slug - The slug of the article to fetch
 * @returns {Promise<APIResponse<any|null>>} The article data with fallback info
 */
export async function fetchArticleBySlug(slug: string): Promise<APIResponse<any|null>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(`${API_URL}/api/articles?where[slug][equals]=${slug}&depth=2`, { 
      next: { revalidate: 60 },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      data: data.docs[0] || null,
      usingMockData: false
    };
  } catch (error: any) {
    logApiError('fetchArticleBySlug', error, { slug });
    
    // Fall back to the local mock API
    console.log('Falling back to mock API for single article...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog?slug=${slug}`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        const data = await mockRes.json();
        return {
          data: data.docs[0] || null,
          usingMockData: true,
          error: `PayloadCMS Connection Failed: ${error.message}`
        };
      } else {
        throw new Error(`Mock API error: ${mockRes.status} ${mockRes.statusText}`);
      }
    } catch (mockError: any) {
      logApiError('fetchArticleBySlug [mockFallback]', mockError, { mockApiUrl, slug });
      
      return {
        data: null,
        usingMockData: true,
        error: `All API attempts failed: ${error.message}, Mock API: ${mockError.message}`
      };
    }
  }
}

/**
 * Fetches all categories from PayloadCMS API
 * Falls back to mock API if PayloadCMS is unavailable
 * Categories are cached for 1 hour
 * 
 * @returns {Promise<APIResponse<any[]>>} Array of category data with fallback info
 */
export async function fetchCategories(): Promise<APIResponse<any[]>> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    const res = await fetch(`${API_URL}/api/categories?limit=100`, { 
      next: { revalidate: 3600 }, // Cache categories longer
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      data: data.docs || [],
      usingMockData: false
    };
  } catch (error: any) {
    logApiError('fetchCategories', error, {});
    
    // Fall back to the local mock API
    console.log('Falling back to mock API for categories...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog/categories`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        const data = await mockRes.json();
        return {
          data: data.docs || [],
          usingMockData: true,
          error: `PayloadCMS Connection Failed: ${error.message}`
        };
      } else {
        throw new Error(`Mock API error: ${mockRes.status} ${mockRes.statusText}`);
      }
    } catch (mockError: any) {
      logApiError('fetchCategories [mockFallback]', mockError, { mockApiUrl });
      
      return {
        data: [],
        usingMockData: true,
        error: `All API attempts failed: ${error.message}, Mock API: ${mockError.message}`
      };
    }
  }
} 