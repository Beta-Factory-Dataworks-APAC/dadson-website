# Dadson Logistics Blog Module

This directory contains the blog module for the Dadson Logistics website, including the index page, article pages, and admin functionality.

## Setup Instructions

### 1. Sanity.io Configuration

To set up the Sanity CMS for the blog module:

1. Install Sanity CLI globally:
   ```bash
   npm install -g @sanity/cli
   ```

2. Create a new Sanity project:
   ```bash
   sanity init
   ```
   - Create a project with a name like "dadson-logistics-blog"
   - Use the "Blog" schema template as a starting point
   - Choose the "Clean project with no predefined schemas" option

3. Copy your project ID and update the `.env.local` file with:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `SANITY_STUDIO_PROJECT_ID`

4. Generate an API token in the Sanity.io management console and add it to `.env.local`:
   - `SANITY_API_TOKEN`

### 2. Sanity Studio Deployment

1. Build and deploy the Sanity Studio:
   ```bash
   cd studio
   sanity deploy
   ```

2. This will provide a URL for your Sanity Studio where you can manage blog content.

## Content Management

### Creating Articles

1. Navigate to your Sanity Studio
2. Create a new Author first
3. Create Categories as needed
4. Create Articles with:
   - Title, slug (auto-generated from title)
   - Featured image
   - Excerpt (150 characters max)
   - Author reference
   - Categories
   - Publication date
   - Rich text content using the WYSIWYG editor

### Content Tips

- **Images**: Use the image upload tool to add images to your articles. Always include alt text.
- **Formatting**: Use headings (H2-H6) to structure your content. The H1 is reserved for the article title.
- **Links**: Use the link tool to add links to your content, with options to open in a new tab.
- **Embeds**: Add media embeds using the appropriate button in the editor.

## Frontend Components

The blog module consists of these main components:

- `BlogIndexPage`: Displays a grid of article cards with category filtering
- `ArticlePage`: Displays a single article with related content
- `ArticleCard`: Card component for displaying article previews
- `CategoryFilter`: UI for filtering articles by category
- `PageHeader`: Header component for pages

## Admin Panel Access

The admin panel is available at `/studio` and requires authentication. User management is handled through Sanity's built-in user management system.

## Dependencies

The blog module uses:
- Sanity.io for content management
- TipTap for the WYSIWYG editor
- Next.js for frontend rendering
- Tailwind CSS with Typography plugin for styling

## Maintenance

To update the Sanity Studio:

1. Make changes to schema files in `/lib/sanity/schemas/`
2. Update Sanity dependencies as needed in package.json
3. Deploy changes to Sanity Studio with `sanity deploy` 