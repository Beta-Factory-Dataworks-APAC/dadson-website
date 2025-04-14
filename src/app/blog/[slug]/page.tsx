import { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/payload/client';
import ArticlePage from '@/components/blog/ArticlePage';
import { notFound } from 'next/navigation';

export const revalidate = 3600; // Revalidate at most once per hour

interface Params {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getBlogPostBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Article Not Found | Dadson Logistics',
      description: 'The requested article could not be found',
    };
  }
  
  const metaTitle = article.seo?.metaTitle || article.title;
  const metaDescription = article.seo?.metaDescription || article.excerpt;
  
  return {
    title: `${metaTitle} | Dadson Logistics Blog`,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: article.publishedDate,
      authors: article.author ? [article.author.name] : undefined,
      images: article.seo?.ogImage ? [article.seo.ogImage.url] : 
             article.featuredImage ? [article.featuredImage.url] : [],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getBlogPosts({ limit: 100 });
  
  return articles.map((article: { slug: string }) => ({
    slug: article.slug,
  }));
}

export default async function Article({ params }: Params) {
  const article = await getBlogPostBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  // Get related posts based on the same categories
  const categoryIds = article.categories?.map((cat: any) => cat.id) || [];
  const relatedPosts = await getRelatedPosts(article.id, categoryIds, 3);
  
  return (
    <main className="min-h-screen">
      <ArticlePage article={article} relatedPosts={relatedPosts} />
    </main>
  );
} 