'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import ArticleCard from './ArticleCard';

/**
 * Represents a blog category
 * @interface Category
 */
interface Category {
  id: string;
  name: string;
  slug: string;
}

/**
 * Represents a blog article author
 * @interface Author
 */
interface Author {
  id: string;
  name: string;
  avatar?: any;
  bio?: string;
}

/**
 * Represents a media item (image, video, etc.)
 * @interface Media
 */
interface Media {
  id: string;
  url: string;
  alt?: string;
  caption?: string;
}

/**
 * Represents a blog article with SEO metadata
 * @interface Article
 */
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

/**
 * Props for the ArticlePage component
 * @interface ArticlePageProps
 */
interface ArticlePageProps {
  article: Article;
  relatedPosts?: Article[];
  usingMockData?: boolean;
  errorMessage?: string;
}

/**
 * ArticlePage component displays a single blog article
 * 
 * @param {ArticlePageProps} props - Component properties
 * @returns {JSX.Element} Rendered component
 */
export default function ArticlePage({ 
  article, 
  relatedPosts = [],
  usingMockData = false,
  errorMessage = ''
}: ArticlePageProps) {
  // Format date for display
  const formattedDate = article.publishedDate ? 
    new Date(article.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    }) : '';
  
  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Mock Data Notification */}
      {usingMockData && (
        <div className="mb-8 p-4 bg-yellow-50 border border-yellow-100 rounded-md">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Using Mock Data</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>This article is from mock data. The connection to the content management system failed.</p>
                {errorMessage && <p className="mt-1 text-xs font-mono">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Article Header */}
      <header className="mb-12">
        {/* Category */}
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap items-center text-[#707C83] mb-4">
            <span className="mr-2">Category:</span>
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
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#101B21] mb-6">
          {article.title}
        </h1>
        
        {/* Meta information */}
        <div className="flex items-center text-[#707C83] mb-8">
          {article.author && (
            <div className="flex items-center mr-6">
              {article.author.avatar ? (
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2">
                  <Image 
                    src={article.author.avatar.url} 
                    alt={article.author.name} 
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full bg-[#E5E5E5] mr-2 flex items-center justify-center">
                  <span className="text-[#707C83] text-sm">
                    {article.author.name.charAt(0)}
                  </span>
                </div>
              )}
              <span>{article.author.name}</span>
            </div>
          )}
          
          {formattedDate && (
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
              <span>{formattedDate}</span>
            </div>
          )}
        </div>
      </header>
      
      {/* Featured Image */}
      {article.featuredImage && (
        <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-12">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <RichText content={article.content} />
      </div>
      
      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t border-[#E5E5E5]">
          <h3 className="font-medium text-lg mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map(tag => (
              <span 
                key={tag}
                className="px-3 py-1 bg-[#F5F5F5] text-[#707C83] text-sm rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts.map(post => (
              <ArticleCard key={post.id} article={post} />
            ))}
          </div>
        </div>
      )}
      
      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Link
          href="/blog"
          className="inline-flex items-center px-6 py-3 bg-[#00B4E1] text-white font-medium rounded-md hover:bg-[#00A1CA] transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Blog
        </Link>
      </div>
    </article>
  );
} 