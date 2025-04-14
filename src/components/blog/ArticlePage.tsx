'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ArticleCard from './ArticleCard';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  avatar?: any;
  bio?: string;
}

interface Media {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
}

interface Article {
  id: string;
  title: string;
  slug: string;
  publishedDate: string;
  excerpt?: string;
  featuredImage: Media;
  content: any;
  categories?: Category[];
  author: Author;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: Media;
  };
}

interface ArticlePageProps {
  article: Article;
  relatedPosts?: Article[];
}

export default function ArticlePage({ article, relatedPosts = [] }: ArticlePageProps) {
  // Image fallback if no image is available
  const imageUrl = article.featuredImage?.url || '/blog-placeholder.jpg';
  const altText = article.featuredImage?.alt || article.title;
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-screen-xl">
      <div className="max-w-4xl mx-auto">
        {/* Back to Blog */}
        <Link
          href="/blog"
          className="inline-flex items-center text-[#00B4E1] hover:underline mb-8"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>
        
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#101B21] mb-4">
            {article.title}
          </h1>
          
          <div className="flex flex-wrap items-center text-[#707C83] mb-6">
            <time dateTime={article.publishedDate}>
              {formatDate(article.publishedDate)}
            </time>
            <span className="mx-2">•</span>
            <span>By {article.author.name}</span>
            
            {article.categories && article.categories.length > 0 && (
              <>
                <span className="mx-2">•</span>
                <div className="flex flex-wrap gap-2">
                  {article.categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/blog?category=${category.slug}`}
                      className="inline-block px-3 py-1 text-xs rounded-full font-medium bg-[#00B4E1]/10 text-[#00B4E1]"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </header>
        
        {/* Featured Image */}
        <div className="relative aspect-[16/9] w-full mb-12 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover"
          />
          {article.featuredImage?.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-3 text-sm">
              {article.featuredImage.caption}
            </div>
          )}
        </div>
        
        {/* Article content */}
        <div className="prose prose-lg max-w-none prose-headings:font-medium prose-headings:text-[#101B21] prose-p:text-[#101B21]">
          {article.excerpt && <p className="text-xl">{article.excerpt}</p>}
          <div 
            className="rich-text-content" 
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
        
        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="mt-16 border-t pt-12">
            <h2 className="text-2xl font-medium text-[#101B21] mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((post) => (
                <ArticleCard key={post.id} article={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 