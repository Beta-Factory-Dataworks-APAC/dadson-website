import { Metadata } from 'next';
import { getBlogPosts, getCategories } from '@/lib/payload/client';
import BlogIndexPage from '@/components/blog/BlogIndexPage';

export const metadata: Metadata = {
  title: 'Blog | Dadson Logistics',
  description: 'Latest news, insights and updates from Dadson Logistics',
};

export const revalidate = 3600; // Revalidate at most once per hour

export default async function BlogPage() {
  const articles = await getBlogPosts({ limit: 20 });
  const categories = await getCategories();
  
  return (
    <main className="min-h-screen">
      <BlogIndexPage articles={articles} categories={categories} />
    </main>
  );
} 