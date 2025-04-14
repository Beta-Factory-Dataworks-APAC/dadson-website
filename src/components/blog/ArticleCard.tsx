'use client';

import Image from 'next/image';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Author {
  id: string;
  name: string;
  avatar?: any;
}

interface Media {
  id: string;
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
  categories?: Category[];
  author: Author;
}

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  // Image fallback if no image is available
  const imageUrl = article.featuredImage?.url || '/blog-placeholder.jpg';
  const altText = article.featuredImage?.alt || article.title;
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
      <Link href={`/blog/${article.slug}`} className="block">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={altText}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </Link>
      
      <div className="p-6">
        {/* Categories */}
        {article.categories && article.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
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
        )}
        
        {/* Title */}
        <Link href={`/blog/${article.slug}`} className="block">
          <h3 className="text-xl font-medium text-[#101B21] mb-2 line-clamp-2 hover:text-[#00B4E1] transition-colors">
            {article.title}
          </h3>
        </Link>
        
        {/* Date and Author */}
        <div className="text-sm text-[#707C83] mb-3">
          {formatDate(article.publishedDate)} • {article.author.name}
        </div>
        
        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-[#101B21] mb-4 line-clamp-3">
            {article.excerpt}
          </p>
        )}
        
        {/* Read More Link */}
        <Link
          href={`/blog/${article.slug}`}
          className="text-[#00B4E1] font-medium inline-flex items-center hover:underline"
        >
          Read More
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
} 