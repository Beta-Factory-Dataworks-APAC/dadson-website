# PayloadCMS Integration for Dadson Logistics Blog

This integration connects the Dadson Logistics website with the PayloadCMS backend for blog content management.

## Overview

The PayloadCMS integration provides:

1. API client for fetching blog content
2. Type definitions for blog data
3. Utilities for formatting and displaying blog content

## API Client

The client provides functions for fetching blog data:

```typescript
// Fetch blog posts with optional filtering
export async function getBlogPosts(options: { 
  limit?: number;
  page?: number;
  categories?: string[];
} = {})

// Fetch a single blog post by slug
export async function getBlogPostBySlug(slug: string)

// Fetch all categories
export async function getCategories()

// Fetch related posts based on categories
export async function getRelatedPosts(
  postId: string, 
  categoryIds: string[], 
  limit: number = 3
)
```

## Environment Variables

The integration requires the following environment variables:

```
PAYLOAD_API_URL=http://localhost:3000/api  # Development
```

In production, update this to your production API URL.

## Usage in Components

Import the client functions in your components:

```tsx
import { getBlogPosts, getCategories } from '@/lib/payload/client';

export default async function BlogPage() {
  const articles = await getBlogPosts({ limit: 20 });
  const categories = await getCategories();
  
  return (
    <main>
      <BlogIndexPage articles={articles} categories={categories} />
    </main>
  );
}
```

## Running the CMS

To run the PayloadCMS locally:

1. Open a new terminal window
2. Navigate to the PayloadCMS directory:
   ```bash
   cd payload/dadson-blog
   ```
3. Install dependencies (if not already done):
   ```bash
   pnpm install
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. The admin interface will be available at http://localhost:3000/admin

## Blog Data Structure

The blog data follows this structure:

- **Blog Post**:
  - `id`: Unique identifier
  - `title`: Post title
  - `slug`: URL-friendly identifier
  - `publishedDate`: Date of publication
  - `excerpt`: Brief summary (optional)
  - `content`: Rich text content
  - `featuredImage`: Image object
  - `categories`: Array of category objects
  - `author`: User object
  - `seo`: SEO metadata

- **Category**:
  - `id`: Unique identifier
  - `name`: Category name
  - `slug`: URL-friendly identifier
  - `description`: Category description (optional)

For more details, see the interfaces defined in the blog components. 