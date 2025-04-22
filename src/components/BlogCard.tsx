import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { formatDate, truncateText } from '@/lib/utils';

interface BlogCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    publishedDate: string;
    featuredImage?: {
      url: string;
      alt: string;
    };
    excerpt?: string;
    categories?: Array<{
      title: string;
      slug: string;
    }>;
  };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      <Link href={`/blog/${post.slug}`} className="block">
        {post.featuredImage ? (
          <div className="relative h-48 w-full">
            <Image
              src={post.featuredImage.url}
              alt={post.featuredImage.alt || post.title}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="bg-gray-200 h-48 w-full flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
        
        <div className="p-4">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {post.categories.map((category) => (
                <span 
                  key={category.slug} 
                  className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full"
                >
                  {category.title}
                </span>
              ))}
            </div>
          )}
          
          <h3 className="text-xl font-bold mb-2 text-gray-900">{post.title}</h3>
          
          {post.excerpt && (
            <p className="text-gray-600 mb-3">
              {truncateText(post.excerpt, 120)}
            </p>
          )}
          
          <div className="text-sm text-gray-500">
            {formatDate(post.publishedDate)}
          </div>
        </div>
      </Link>
    </div>
  );
} 