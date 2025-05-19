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
    const articleResponse = await fetchArticleBySlug(resolvedParams.slug);
    const article = articleResponse.data;
    
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
    const articleResponse = await fetchArticleBySlug(resolvedParams.slug);
    const article = articleResponse.data;
    const usingMockData = articleResponse.usingMockData;
    const errorMessage = articleResponse.error;
    
    if (!article) {
      notFound();
    }
    
    return (
      <ArticlePage 
        article={article} 
        relatedPosts={[]} 
        usingMockData={usingMockData}
        errorMessage={errorMessage}
      />
    );
  } catch (error) {
    console.error('Error fetching article:', error);
    notFound();
  }
} 