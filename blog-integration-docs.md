# Dadson Logistics Blog Integration Documentation

This document outlines the structure of the blog system, common issues, and how to properly run and test the blog functionality.

## Overview

The Dadson Logistics blog uses:
- **Next.js**: Frontend framework for rendering blog pages
- **PayloadCMS**: Self-hosted headless CMS for content management
- **MongoDB**: Database for storing blog content

## System Architecture

1. **Frontend Layer**:
   - Blog index page: `/src/app/blog/page.tsx`
   - Article detail page: `/src/app/blog/[slug]/page.tsx`
   - Blog components in `/src/components/blog/`

2. **API Layer**:
   - PayloadCMS API endpoints: `http://localhost:3001/api/`
   - Next.js API routes:
     - `/src/app/api/blog/route.ts`: Provides fallback mock data
     - `/src/app/api/blog/categories/route.ts`: Provides fallback categories

3. **CMS Layer**:
   - PayloadCMS: Independent service running on port 3001
   - Collections: Articles, Categories, Media, Users
   - Admin panel: `http://localhost:3001/admin`

4. **Database Layer**:
   - MongoDB: Accessed by PayloadCMS
   - Database name: `dadson-blog`

## Common Issues

### 1. Port Conflicts

**Issue**: PayloadCMS (port 3001) and Next.js (port 3000) can experience port conflicts.

**Solutions**:
- Use `npm run dev:check-ports` to detect conflicts
- Kill processes using the desired ports
- Configure alternative ports in environment files

### 2. Database Connection

**Issue**: MongoDB connection failures.

**Solutions**:
- Ensure MongoDB is running: `brew services start mongodb/brew/mongodb-community`
- Check MongoDB connection string in `.env` and `.env.local`

### 3. PayloadCMS Startup

**Issue**: PayloadCMS may fail to start due to configuration issues.

**Solutions**:
- Use `npm run dev:cms-check` to verify environment
- Check for errors in PayloadCMS logs
- Verify proper configuration in `payload/dadson-blog/src/payload.config.ts`

### 4. API Fallback

**Issue**: PayloadCMS API unavailability causing frontend errors.

**Solution**: A fallback mechanism has been implemented that serves mock data if PayloadCMS is not available.

## Running the Blog System

### Method 1: All-in-One Script

```bash
# Start MongoDB, PayloadCMS, and Next.js in one command
npm run dev:blog
```

### Method 2: Individual Services

```bash
# 1. Check environment and ports
npm run dev:cms-check

# 2. Start MongoDB if not running
brew services start mongodb/brew/mongodb-community

# 3. Start PayloadCMS
npm run dev:cms

# 4. In a separate terminal, start Next.js
npm run dev
```

## Testing the Blog System

A comprehensive test script is available to verify all components of the blog system:

```bash
# Run the test script
npm run test:blog
```

The test script checks:
1. MongoDB connection and database status
2. PayloadCMS API accessibility and response
3. Next.js API routes and fallback mechanism
4. Blog frontend accessibility

## Admin Access

PayloadCMS admin panel is available at: http://localhost:3001/admin

Default credentials:
- Email: `admin@dadson.com`
- Password: `admin123`

**IMPORTANT**: Update these credentials in production.

## Troubleshooting Guide

### PayloadCMS Not Starting

1. Check if MongoDB is running:
   ```bash
   brew services list | grep mongodb
   ```

2. Verify environment variables:
   ```bash
   cat payload/dadson-blog/.env
   ```

3. Check for port conflicts:
   ```bash
   lsof -i :3001
   ```

### Blog Content Not Showing

1. Test PayloadCMS API directly:
   ```bash
   curl http://localhost:3001/api/articles
   ```

2. Test Next.js API fallback:
   ```bash
   curl http://localhost:3000/api/blog
   ```

3. Check browser console for errors on the blog page

### Database Issues

1. Connect to MongoDB:
   ```bash
   mongosh mongodb://localhost:27017/dadson-blog
   ```

2. Check collections:
   ```javascript
   show collections
   ```

3. Check articles:
   ```javascript
   db.articles.find()
   ```

## Environment Variables

### Next.js (.env.local)
```
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
MONGODB_URI=mongodb://localhost:27017/dadson-blog
PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
```

### PayloadCMS (payload/dadson-blog/.env)
```
MONGODB_URI=mongodb://localhost:27017/dadson-blog
PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
PAYLOAD_PORT=3001
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

## Further Improvements

1. **Container-based deployment**: Use Docker to package the entire stack
2. **Production security**: Update security keys and credentials
3. **Monitor logs**: Add better logging for debugging
4. **Automated testing**: Expand test suite to cover more edge cases