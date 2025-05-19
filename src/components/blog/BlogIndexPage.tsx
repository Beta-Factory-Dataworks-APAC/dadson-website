'use client';

import { useState } from 'react';
import ArticleCard from './ArticleCard';
import CategoryFilter from './CategoryFilter';
import PageHeader from './PageHeader';

/**
 * Represents a blog category
 * @interface Category
 */
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

/**
 * Represents a blog article author
 * @interface Author
 */
interface Author {
  id: string;
  name: string;
  avatar?: any;
}

/**
 * Represents a media item (image, video, etc.)
 * @interface Media
 */
interface Media {
  id: string;
  url: string;
  alt?: string;
}

/**
 * Represents a blog article
 * @interface Article
 */
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

/**
 * Props for the BlogIndexPage component
 * @interface BlogIndexPageProps
 */
interface BlogIndexPageProps {
  articles: Article[];
  categories: Category[];
  usingMockData?: boolean;
  errorMessage?: string;
}

/**
 * BlogIndexPage Component
 * 
 * Displays a grid of blog articles with category filtering and pagination
 * 
 * @param {BlogIndexPageProps} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export default function BlogIndexPage({ 
  articles, 
  categories, 
  usingMockData = false, 
  errorMessage = '' 
}: BlogIndexPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;
  
  // Filter articles by category if selected
  const filteredArticles = selectedCategory
    ? articles.filter(article =>
        article.categories?.some(category => category.slug === selectedCategory)
      )
    : articles;
  
  // Calculate pagination
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  
  // Handle category selection
  const handleCategorySelect = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Reset to first page on category change
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-screen-xl">
      <PageHeader
        title="Dadson Logistics Blog"
        description="Latest news, insights and updates from the logistics industry"
      />
      
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
                <p>The blog is currently displaying mock data. The connection to the content management system failed.</p>
                {errorMessage && <p className="mt-1 text-xs font-mono">{errorMessage}</p>}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mb-12">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />
      </div>
      
      {filteredArticles.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-16">
              <nav className="inline-flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-4 py-2 mx-1 rounded-md ${
                      currentPage === page
                        ? 'bg-[#00B4E1] text-white'
                        : 'bg-white text-[#101B21] border border-[#E3E3E3]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-2xl font-medium text-[#101B21] mb-4">No articles found</h3>
          <p className="text-[#707C83]">
            {selectedCategory
              ? 'No articles found in this category. Please try another category.'
              : 'No articles found. Please check back later.'}
          </p>
          {selectedCategory && (
            <button
              onClick={() => handleCategorySelect(null)}
              className="mt-6 px-6 py-3 bg-[rgba(0,180,225,0.9)] text-white rounded-md font-medium"
            >
              View All Articles
            </button>
          )}
        </div>
      )}
    </div>
  );
} 