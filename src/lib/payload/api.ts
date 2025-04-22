const API_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001';

interface FetchArticlesParams {
  page?: number;
  limit?: number;
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function fetchArticles({
  page = 1,
  limit = 10,
  category,
  sortBy = 'publishedDate',
  sortOrder = 'desc',
}: FetchArticlesParams = {}) {
  let url = `${API_URL}/api/articles?depth=2&page=${page}&limit=${limit}&sort=${sortBy}${sortOrder === 'desc' ? '-desc' : ''}`;
  
  // Add filters if category is provided
  if (category) {
    url += `&where[category.slug][equals]=${category}`;
  }
  
  // Add published filter
  url += `&where[status][equals]=published`;
  
  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch articles: ${res.status}`);
    }
    
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    
    // Fall back to the local mock API if the Payload CMS connection fails
    console.log('Falling back to mock API...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog${category ? `?category=${category}` : ''}`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        return mockRes.json();
      }
    } catch (mockError) {
      console.error('Error fetching from mock API:', mockError);
    }
    
    return { docs: [], totalPages: 0, page: 1 };
  }
}

export async function fetchArticleBySlug(slug: string) {
  try {
    const res = await fetch(`${API_URL}/api/articles?where[slug][equals]=${slug}&depth=2`, { 
      next: { revalidate: 60 } 
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch article: ${res.status}`);
    }
    
    const data = await res.json();
    return data.docs[0] || null;
  } catch (error) {
    console.error('Error fetching article by slug:', error);
    
    // Fall back to the local mock API
    console.log('Falling back to mock API...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog?slug=${slug}`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        const data = await mockRes.json();
        return data.docs[0] || null;
      }
    } catch (mockError) {
      console.error('Error fetching from mock API:', mockError);
    }
    
    return null;
  }
}

export async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/api/categories?limit=100`, { 
      next: { revalidate: 3600 } // Cache categories longer
    });
    
    if (!res.ok) {
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }
    
    const data = await res.json();
    return data.docs || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    
    // Fall back to the local mock API
    console.log('Falling back to mock API...');
    // Use a fully qualified URL for the mock API
    const host = typeof window === 'undefined' ? API_URL : window.location.origin;
    const mockApiUrl = `${host}/api/blog/categories`;
    
    try {
      const mockRes = await fetch(mockApiUrl);
      if (mockRes.ok) {
        const data = await mockRes.json();
        return data.docs || [];
      }
    } catch (mockError) {
      console.error('Error fetching from mock API:', mockError);
    }
    
    return [];
  }
} 