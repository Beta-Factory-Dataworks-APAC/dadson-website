import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchArticleBySlug } from '@/lib/payload/api';
import ArticlePage from '@/components/blog/ArticlePage';

interface ArticlePageParams {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageParams): Promise<Metadata> {
  try {
    const resolvedParams = await Promise.resolve(params);
    const article = await fetchArticleBySlug(resolvedParams.slug);
    
    if (!article) {
      return {
        title: 'Article Not Found | Dadson Logistics',
      };
    }
    
    return {
      title: `${article.title} | Dadson Logistics Blog`,
      description: article.excerpt || `Read about ${article.title}`,
    };
  } catch (error) {
    return {
      title: 'Blog | Dadson Logistics',
    };
  }
}

export default async function ArticleSlugPage({ params }: ArticlePageParams) {
  try {
    const resolvedParams = await Promise.resolve(params);
    const article = await fetchArticleBySlug(resolvedParams.slug);
    
    if (!article) {
      notFound();
    }
    
    return <ArticlePage article={article} relatedPosts={[]} />;
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
} 