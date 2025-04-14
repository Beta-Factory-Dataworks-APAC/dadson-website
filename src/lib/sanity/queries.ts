import { groq } from 'next-sanity';
import { getClient } from './client';

// Get all articles for the blog index page
export async function getAllArticles() {
  return getClient().fetch(
    groq`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage,
      "categories": categories[]->{ title, slug, color },
      "author": author->{ name, slug, image }
    }`
  );
}

// Get featured articles for homepage or sidebar
export async function getFeaturedArticles(limit = 3) {
  return getClient().fetch(
    groq`*[_type == "article"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage,
      "categories": categories[]->{ title, slug, color },
      "author": author->{ name, slug }
    }`
  );
}

// Get a single article by slug
export async function getArticleBySlug(slug: string) {
  return getClient().fetch(
    groq`*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage,
      body,
      "categories": categories[]->{ title, slug, color },
      "author": author->{ name, slug, image, bio, role, social },
      "relatedArticles": *[_type == "article" && slug.current != $slug && count(categories[@._ref in ^.^.categories[]._ref]) > 0] | order(publishedAt desc)[0...3] {
        _id,
        title,
        slug,
        publishedAt,
        excerpt,
        featuredImage,
        "categories": categories[]->{ title, slug, color }
      }
    }`,
    { slug }
  );
}

// Get articles by category
export async function getArticlesByCategory(categorySlug: string) {
  return getClient().fetch(
    groq`*[_type == "article" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      featuredImage,
      "categories": categories[]->{ title, slug, color },
      "author": author->{ name, slug, image }
    }`,
    { categorySlug }
  );
}

// Get all categories
export async function getAllCategories() {
  return getClient().fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color,
      featured
    }`
  );
}

// Get all featured categories
export async function getFeaturedCategories() {
  return getClient().fetch(
    groq`*[_type == "category" && featured == true] | order(title asc) {
      _id,
      title,
      slug,
      description,
      color
    }`
  );
} 