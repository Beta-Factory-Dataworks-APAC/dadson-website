/**
 * Client for interacting with the PayloadCMS API
 */

// Use the environment variable or fall back to a default
const apiUrl = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';

// Helper to handle fetch errors
async function fetchWithErrorHandling(url: string) {
  try {
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Cache for up to 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for ${url}:`, error);
    throw error;
  }
}

export async function getBlogPosts(options: { 
  limit?: number;
  page?: number;
  categories?: string[];
} = {}) {
  const { limit = 10, page = 1, categories = [] } = options;
  
  let query = `${apiUrl}/blog-posts?where[status][equals]=published&sort=-publishedDate&limit=${limit}&page=${page}`;
  
  if (categories && categories.length > 0) {
    query += `&where[categories][in]=${categories.join(',')}`;
  }
  
  try {
    const data = await fetchWithErrorHandling(query);
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch blog posts:', error);
    return [];
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const data = await fetchWithErrorHandling(`${apiUrl}/blog-posts?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`);
    return data.docs?.[0] || null;
  } catch (error) {
    console.error(`Failed to fetch blog post with slug ${slug}:`, error);
    return null;
  }
}

export async function getCategories() {
  try {
    const data = await fetchWithErrorHandling(`${apiUrl}/categories?limit=100`);
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return [];
  }
}

export async function getRelatedPosts(postId: string, categoryIds: string[], limit: number = 3) {
  const categoryFilter = categoryIds.length > 0 
    ? `&where[categories][in]=${categoryIds.join(',')}`
    : '';
    
  try {
    const data = await fetchWithErrorHandling(
      `${apiUrl}/blog-posts?where[status][equals]=published&where[id][not_equals]=${postId}${categoryFilter}&limit=${limit}`
    );
    return data.docs || [];
  } catch (error) {
    console.error('Failed to fetch related posts:', error);
    return [];
  }
} 