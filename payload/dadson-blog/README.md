# Dadson Logistics Blog CMS

This is a self-hosted PayloadCMS implementation for the Dadson Logistics blog. It provides a user-friendly admin interface for managing blog content with zero ongoing costs through self-hosting.

## Features

- Headless CMS with admin interface
- Blog post management with rich text editor
- Category management for post organization
- User management with different permission levels
- Media library for image management
- Integrated with the Next.js frontend

## Setup

1. Install dependencies:

```bash
cd payload/dadson-blog
pnpm install
```

2. Set up environment variables - Copy the .env.example file to .env:

```bash
cp .env.example .env
```

3. Edit the .env file to set the required variables:

```
PAYLOAD_SECRET=your-secret-key-here
DATABASE_URI=file:./dadson-blog.db
```

## Development

To run the PayloadCMS locally:

```bash
pnpm dev
```

The admin interface will be available at http://localhost:3000/admin

## Production Deployment

For production deployment, you'll need to:

1. Build the PayloadCMS project:

```bash
pnpm build
```

2. Start the production server:

```bash
pnpm serve
```

## Integration with Next.js

The Next.js frontend is configured to fetch data from this PayloadCMS instance. The integration is managed through the client in `src/lib/payload/client.ts`.

Make sure the environment variables in your Next.js project point to the correct PayloadCMS API URL:

```
PAYLOAD_API_URL=http://localhost:3000/api  # Development
```

For production, update this to your production API URL.

## Content Models

The CMS includes the following content models:

1. **Blog Posts** - Main content for the blog with fields for:
   - Title and slug
   - Featured image
   - Categories
   - Content (rich text)
   - Author
   - SEO metadata

2. **Categories** - For organizing blog posts

3. **Media** - For managing images and other media files

4. **Users** - For CMS access and author information

## Authentication

The default admin user credentials are:

- Email: admin@dadsonlogistics.com
- Password: password123

Change these credentials after first login for security.
