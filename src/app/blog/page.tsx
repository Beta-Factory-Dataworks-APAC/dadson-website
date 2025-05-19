import React from 'react';
import { Metadata } from 'next';
import { fetchArticles, fetchCategories } from '@/lib/payload/api';
import BlogIndexPage from '@/components/blog/BlogIndexPage';

export const metadata: Metadata = {
  title: 'Blog | Dadson Logistics',
  description: 'Latest news, insights and updates from Dadson Logistics',
};

export default async function BlogPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Wait for searchParams to be available before destructuring
  const params = await Promise.resolve(searchParams);
  
  // Now it's safe to access the params properties
  const pageParam = params?.page;
  const categoryParam = params?.category;
  
  // Parse and validate the parameters
  const page = typeof pageParam === 'string' ? parseInt(pageParam, 10) || 1 : 1;
  const category = typeof categoryParam === 'string' ? categoryParam : undefined;
  
  // Fetch data with error handling
  let articles = [];
  let categories = [];
  
  try {
    const articlesData = await fetchArticles({
      page,
      limit: 9,
      category,
    });
    articles = articlesData.docs || [];
    
    categories = await fetchCategories();
  } catch (error) {
    console.error('Error fetching blog data:', error);
    // Continue with empty arrays - UI will handle this state
  }
  
  return (
    <BlogIndexPage 
      articles={articles}
      categories={categories}
    />
  );
} 