# Complete PayloadCMS Setup Guide for Dadson Blog

This guide will walk you through setting up PayloadCMS with MongoDB to power your blog functionality.

## Prerequisites

- MongoDB Community Edition installed
- Node.js 16+ installed

## 1. MongoDB Setup

MongoDB is now installed via Homebrew. You can manage it with the following commands:

```bash
# Start MongoDB service
brew services start mongodb/brew/mongodb-community

# Stop MongoDB service
brew services stop mongodb/brew/mongodb-community

# Check MongoDB status
brew services list
```

The database `dadson-blog` has been created for your blog content.

## 2. Environment Variables Setup

Two environment files have been created:

1. **For PayloadCMS** (`payload/dadson-blog/.env`):
   ```
   MONGODB_URI=mongodb://localhost:27017/dadson-blog
   PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
   PAYLOAD_PORT=3001
   PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
   ```

2. **For Next.js** (`.env.local` in project root):
   ```
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
   MONGODB_URI=mongodb://localhost:27017/dadson-blog
   PAYLOAD_SECRET=dadson-blog-secret-key-change-me-in-production
   ```

## 3. Admin User Setup

An admin user has been created with the following credentials:
- Email: admin@dadson.com
- Password: admin123

**IMPORTANT**: Change this password in production!

## 4. Starting the Services

Always start the services in this specific order:

### Step 1: Start MongoDB
```bash
brew services start mongodb/brew/mongodb-community
```

### Step 2: Start PayloadCMS
```bash
cd payload/dadson-blog
npm run dev
```

You should see output like:
```
PayloadCMS server running at http://localhost:3001
Admin panel available at http://localhost:3001/admin
```

### Step 3: Start Next.js Frontend
```bash
# In project root
npm run dev -- -p 3000
```

## 5. Managing Blog Content

1. Access the PayloadCMS admin panel at: http://localhost:3001/admin
2. Log in with the credentials above
3. Create content in this order:
   - Categories (required for articles)
   - Media uploads (for article thumbnails) 
   - Articles (which require categories and media)

## 6. Troubleshooting

If you encounter issues:

1. **PayloadCMS not starting:**
   ```bash
   cd payload/dadson-blog
   npm run build
   PAYLOAD_CONFIG_PATH=src/payload.config.ts node src/server.ts
   ```

2. **MongoDB connection errors:**
   ```bash
   # Check if MongoDB is running
   brew services list
   # Restart MongoDB if needed
   brew services restart mongodb/brew/mongodb-community
   ```

3. **Port conflicts:**
   - Make sure PayloadCMS is running on port 3001
   - Make sure Next.js is running on port 3000
   - Check for processes using these ports:
     ```bash
     lsof -i :3000
     lsof -i :3001
     ```

4. **API Errors in Next.js:**
   - Check that `NEXT_PUBLIC_PAYLOAD_URL` points to the correct URL
   - Ensure PayloadCMS is running before Next.js

## 7. API Integration

The blog system now has fallback mechanisms to use mock data when PayloadCMS is not available.

When PayloadCMS is properly set up and running:
1. Navigate to http://localhost:3000/blog to see the blog index
2. You should see your articles displayed
3. Click on articles to view details
4. Use the category filter to see category-specific posts

## 8. Production Considerations

For production deployment:
1. Use a secure MongoDB instance with authentication
2. Change the `PAYLOAD_SECRET` to a secure random string
3. Update the URLs to point to your production domains
4. Set up proper SSL/TLS for both services 