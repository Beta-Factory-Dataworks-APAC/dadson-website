/**
 * Base URL for the blog API
 */
const API_URL = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin;

/**
 * Parameters for fetching articles from the API
 */
interface FetchArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Simplified API response
 */
interface APIResponse<T> {
  data: T;
  error?: string;
}

/**
 * Fetches articles from the file-based blog API
 */
export async function fetchArticles({
  page = 1,
  limit = 10,
  category,
}: FetchArticlesParams = {}): Promise<APIResponse<{docs: any[], totalPages: number, page: number}>> {
  try {
    let url = `${API_URL}/api/blog?page=${page}&limit=${limit}`;
    
    if (category) {
      url += `&category=${category}`;
    }
    
    const res = await fetch(url, { 
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return { data };
  } catch (error: any) {
    console.error('Failed to fetch articles:', error);
    return {
      data: { docs: [], totalPages: 0, page: 1 },
      error: error.message
    };
  }
}

/**
 * Fetches a single article by its slug
 */
export async function fetchArticleBySlug(slug: string): Promise<APIResponse<any|null>> {
  try {
    const res = await fetch(`${API_URL}/api/blog?slug=${slug}`, { 
      next: { revalidate: 60 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      data: data.docs[0] || null
    };
  } catch (error: any) {
    console.error('Failed to fetch article:', error);
    return {
      data: null,
      error: error.message
    };
  }
}

/**
 * Fetches all categories
 */
export async function fetchCategories(): Promise<APIResponse<any[]>> {
  try {
    const res = await fetch(`${API_URL}/api/blog/categories`, { 
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status} ${res.statusText}`);
    }
    
    const data = await res.json();
    return {
      data: data.docs || []
    };
  } catch (error: any) {
    console.error('Failed to fetch categories:', error);
    return {
      data: [],
      error: error.message
    };
  }
} 