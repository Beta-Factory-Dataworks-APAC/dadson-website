# Dadson Logistics Blog Module Documentation

## Architecture Overview

The blog module is built using a modern JAMstack architecture:

- **Frontend**: Next.js (React framework)
- **CMS**: PayloadCMS (headless CMS)
- **Database**: MongoDB
- **API**: REST API with fallback mock data

## Component Structure

### Pages
- `src/app/blog/page.tsx`: Main blog listing page
- `src/app/blog/[slug]/page.tsx`: Article detail page

### Components
- `ArticlePage.tsx`: Displays individual article content
- `BlogIndexPage.tsx`: Lists articles with filtering options
- `ArticleCard.tsx`: Card component for article previews
- `CategoryFilter.tsx`: UI for filtering articles by category
- `RichText.tsx`: Renders rich text content from PayloadCMS
- `PageHeader.tsx`: Standard header for blog pages

## Data Flow

1. **Frontend Requests**:
   - Next.js pages request data from PayloadCMS API
   - If PayloadCMS is unavailable, falls back to mock API

2. **API Flow**:
   ```
   Frontend Request → fetchArticles() → PayloadCMS API → MongoDB
                                     ↓ (fallback)
                                  Mock API
   ```

3. **Data Fetching Functions** (`src/lib/payload/api.ts`):
   - `fetchArticles()`: Gets list of articles with optional filtering
   - `fetchArticleBySlug()`: Gets single article by slug
   - `fetchCategories()`: Gets list of all categories

## API Endpoints

### PayloadCMS Endpoints
- `GET /api/articles`: List all articles (with pagination)
- `GET /api/articles?where[slug][equals]=<slug>`: Get article by slug
- `GET /api/categories`: List all categories

### Mock API Endpoints (Fallback)
- `GET /api/blog`: List all mock articles
- `GET /api/blog?slug=<slug>`: Get mock article by slug
- `GET /api/blog/categories`: List all mock categories

## PayloadCMS Integration

### Collections
- **Articles**: Blog posts with rich content
- **Categories**: Article categorization
- **Media**: Image and file storage
- **Users**: Content authors and editors

### Configuration
- Server configured in `payload.config.ts`
- Default URL: `http://localhost:3001`
- Admin panel: `http://localhost:3001/admin`

## Setup Instructions

### Prerequisites
- Node.js 16+
- MongoDB

### Environment Setup
1. MongoDB Setup:
   ```bash
   # Start MongoDB
   brew services start mongodb/brew/mongodb-community
   ```

2. Environment Variables:
   - For PayloadCMS:
     ```
     MONGODB_URI=mongodb://localhost:27017/dadson-blog
     PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
     PAYLOAD_PORT=3001
     PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
     NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
     ```
   - For Next.js:
     ```
     NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
     ```

### Starting the Development Environment

1. Check for port conflicts:
   ```bash
   npm run dev:check-ports
   ```

2. Start MongoDB:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

3. Start PayloadCMS:
   ```bash
   cd payload/dadson-blog
   npm run dev
   ```

4. Start Next.js:
   ```bash
   # In project root
   npm run dev
   ```

5. Access:
   - Blog frontend: `http://localhost:3000/blog`
   - PayloadCMS admin: `http://localhost:3001/admin`

## Current Status and Issues

### Working Features
- Blog frontend components (UI implementation)
- API fetching with fallback to mock data
- Category filtering
- Article detail pages

### Known Issues
- Port conflicts between Next.js and PayloadCMS
- PayloadCMS integration may not be fully operational
- Database connection and auth issues possible

### Recent Fixes
- Added port conflict detection script (`check-ports.js`)
- Created npm script for checking ports (`npm run dev:check-ports`)

## Development Roadmap

### Phase 1: Stabilization
- Fix port conflicts (✅ Implemented)
- Ensure PayloadCMS is properly connected
- Test data flow between CMS and frontend

### Phase 2: Enhancement
- Add pagination to blog listing
- Implement related articles feature
- Add search functionality

### Phase 3: Content Management
- Define content guidelines
- Set up SEO metadata
- Create editorial workflow

## Troubleshooting

### Common Issues

#### Port Conflicts
- Use `npm run dev:check-ports` to detect and resolve conflicts
- Alternative ports can be configured in environment variables

#### PayloadCMS Connection Failures
- Check MongoDB is running
- Verify environment variables are correct
- Confirm network access between services

#### Missing Content
- Check if data exists in PayloadCMS admin
- Verify API endpoints are returning expected data
- Check frontend components are correctly rendering data

## Contributing Guidelines

1. **Code Structure**:
   - Keep components modular and reusable
   - Follow established naming conventions
   - Use TypeScript interfaces for data models

2. **API Usage**:
   - Use existing fetch functions from `api.ts`
   - Maintain fallback mechanisms for resilience
   - Add proper error handling

3. **Testing**:
   - Test with both live CMS and mock data
   - Verify mobile and desktop layouts
   - Test error states and loading states

## Resources

- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)

---

*Last Updated: [Current Date]*

*Maintainers: [Dadson Logistics Development Team]* 