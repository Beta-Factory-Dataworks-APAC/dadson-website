import { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts, getRelatedPosts } from '@/lib/payload/client';
import ArticlePage from '@/components/blog/ArticlePage';
import { notFound } from 'next/navigation';

// Change from static to dynamic generation to avoid fetching during build
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate at most once per hour

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
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
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Blog Article | Dadson Logistics',
      description: 'Dadson Logistics blog article',
    };
  }
}

// Comment out or remove the generateStaticParams function to prevent
// static generation attempts during build
// export async function generateStaticParams(): Promise<{ slug: string }[]> {
//   // This function tries to connect to the CMS during build time
//   try {
//     const articles = await getBlogPosts({ limit: 100 });
//     return articles.map((article: { slug: string }) => ({
//       slug: article.slug,
//     }));
//   } catch (error) {
//     console.error('Error generating static params:', error);
//     return [];
//   }
// }

export default async function Article({ params }: { params: { slug: string } }) {
  try {
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
  } catch (error) {
    console.error('Error rendering article:', error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4">Unable to load article</h1>
          <p>There was an error loading this article. Please try again later.</p>
        </div>
      </main>
    );
  }
} 