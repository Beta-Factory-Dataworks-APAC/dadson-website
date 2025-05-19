import React from 'react';
import { Metadata } from 'next';
import { fetchArticles, fetchCategories } from '@/lib/payload/api';
import BlogIndexPage from '@/components/blog/BlogIndexPage';

export const metadata: Metadata = {
  title: 'Blog | Dadson Logistics',
  description: 'Latest news, insights and updates from Dadson Logistics',
};

export default async function BlogPage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
  // Using searchParams properly with destructuring and type safety
  const pageParam = searchParams?.page;
  const categoryParam = searchParams?.category;
  
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