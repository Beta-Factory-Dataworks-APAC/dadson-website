'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Author {
  id: string;
  name: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Media {
  url: string;
  alt?: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt?: string;
  featuredImage: Media;
  author: Author;
  category?: Category;
}

interface BlogPreviewSectionProps {
  articles: Article[];
}

/**
 * BlogPreviewSection Component
 * 
 * Displays the latest 3 blog posts on the homepage
 * 
 * @param {BlogPreviewSectionProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function BlogPreviewSection({ articles }: BlogPreviewSectionProps) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#101B21] mb-4">
              Latest From Our Blog
            </h2>
            <p className="text-[#707C83] max-w-2xl">
              Stay updated with the latest insights, news, and trends in the logistics industry
            </p>
          </div>
          
          <Link
            href="/blog"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 bg-[#00B4E1] text-white font-medium rounded-md hover:bg-[#00A1CA] transition-colors"
          >
            View All Posts
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
        
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
                {article.featuredImage && (
                  <div className="relative h-48 w-full">
                    <Image
                      src={article.featuredImage.url}
                      alt={article.featuredImage.alt || article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                
                <div className="p-6">
                  {article.category && (
                    <Link
                      href={`/blog?category=${article.category.slug}`}
                      className="text-sm font-medium text-[#00B4E1] hover:underline"
                    >
                      {article.category.name}
                    </Link>
                  )}
                  
                  <h3 className="mt-2 text-xl font-semibold text-[#101B21]">
                    <Link href={`/blog/${article.slug}`} className="hover:text-[#00B4E1] transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  
                  {article.excerpt && (
                    <p className="mt-3 text-[#707C83] line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                  
                  <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="text-sm text-[#707C83]">
                        By {article.author.name}
                      </span>
                    </div>
                    
                    <span className="text-sm text-[#707C83]">
                      {formatDate(article.publishedDate)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg text-center">
            <h3 className="text-xl font-medium text-[#101B21] mb-2">No Articles Yet</h3>
            <p className="text-[#707C83]">
              Check back soon for updates from our team
            </p>
          </div>
        )}
      </div>
    </section>
  );
} 