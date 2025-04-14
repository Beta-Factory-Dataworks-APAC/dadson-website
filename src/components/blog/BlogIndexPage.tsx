'use client';

import { useState } from 'react';
import ArticleCard from './ArticleCard';
import CategoryFilter from './CategoryFilter';
import PageHeader from './PageHeader';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
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

interface BlogIndexPageProps {
  articles: Article[];
  categories: Category[];
}

export default function BlogIndexPage({ articles, categories }: BlogIndexPageProps) {
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