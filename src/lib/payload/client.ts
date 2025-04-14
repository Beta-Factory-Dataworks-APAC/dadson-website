/**
 * Client for interacting with the PayloadCMS API
 */

const apiUrl = process.env.PAYLOAD_API_URL || 'http://localhost:3000/api';

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
  
  const response = await fetch(query);
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog posts');
  }
  
  const data = await response.json();
  return data.docs;
}

export async function getBlogPostBySlug(slug: string) {
  const response = await fetch(`${apiUrl}/blog-posts?where[slug][equals]=${slug}&where[status][equals]=published&depth=2`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch blog post');
  }
  
  const data = await response.json();
  return data.docs[0];
}

export async function getCategories() {
  const response = await fetch(`${apiUrl}/categories?limit=100`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }
  
  const data = await response.json();
  return data.docs;
}

export async function getRelatedPosts(postId: string, categoryIds: string[], limit: number = 3) {
  const categoryFilter = categoryIds.length > 0 
    ? `&where[categories][in]=${categoryIds.join(',')}`
    : '';
    
  const response = await fetch(
    `${apiUrl}/blog-posts?where[status][equals]=published&where[id][not_equals]=${postId}${categoryFilter}&limit=${limit}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch related posts');
  }
  
  const data = await response.json();
  return data.docs;
} 