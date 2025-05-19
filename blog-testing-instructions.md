# Blog Functionality Testing Instructions

This guide will walk you through starting all the required services to test the Dadson Logistics blog functionality.

## Prerequisites

- MongoDB installed (via Homebrew)
- Node.js 16+ installed
- Git configured

## Step 1: Checking Out the Test Branch

We've created a dedicated branch for blog testing:

```bash
# Check current branch
git branch

# If not already on blog-testing-branch, switch to it
git checkout blog-testing-branch
```

✅ **Current Status**: Currently on `blog-testing-branch`

## Step 2: Check for Port Conflicts

Before starting any services, we need to ensure the required ports (3000 for Next.js and 3001 for PayloadCMS) are available:

```bash
npm run dev:check-ports
```

If there are port conflicts, the script will help you resolve them by either:
1. Killing the processes using those ports
2. Suggesting alternative ports

✅ **Current Status**: Both required ports are available

## Step 3: Verify MongoDB is Running

MongoDB is required for PayloadCMS to store blog content:

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# If not running, start it
# brew services start mongodb/brew/mongodb-community
```

✅ **Current Status**: MongoDB is running

## Step 4: Start PayloadCMS

PayloadCMS needs to be started first:

```bash
# Navigate to the PayloadCMS directory
cd payload/dadson-blog

# Install dependencies if needed
npm install

# Start PayloadCMS
npm run dev

# Leave this terminal running and open a new terminal for the next steps
```

## Step 5: Start Next.js Frontend

In a new terminal:

```bash
# Navigate back to the project root
cd /Users/kashishkumar/Documents/G_drive/BF/dev/projects/BF_company_projects/client-dadson/landingWebsite/dadson-website

# Start Next.js
npm run dev
```

## Step 6: Access the Blog

Once both services are running:

1. Open your browser and navigate to:
   - Blog frontend: http://localhost:3000/blog
   - PayloadCMS admin: http://localhost:3001/admin

2. For the PayloadCMS admin, use these credentials:
   - Email: admin@dadson.com
   - Password: admin123

## Step 7: Testing Blog Functionality

### Test the Blog Listing Page
- Verify that blog articles are displayed
- Test category filtering
- Check pagination (if implemented)

### Test Article Detail Pages
- Click on an article to view its detail page
- Verify that content is properly displayed
- Check that images load correctly

### Test Admin Functionality
- Login to PayloadCMS admin
- Create a new blog article
- Edit an existing article
- Delete an article
- Create a new category

## Troubleshooting

### If PayloadCMS Fails to Connect to MongoDB
- Verify MongoDB is running: `brew services list | grep mongodb`
- Check MongoDB connection string in PayloadCMS `.env` file

### If Next.js Cannot Connect to PayloadCMS
- Ensure PayloadCMS is running
- Check API URL in `.env.local` file

### If Port Conflicts Persist
- Run `npm run dev:check-ports` again
- Consider using alternative ports as suggested by the script

## After Testing

When you're done testing, you can stop the services:

1. Stop Next.js: Press `Ctrl+C` in the Next.js terminal
2. Stop PayloadCMS: Press `Ctrl+C` in the PayloadCMS terminal
3. Optionally stop MongoDB: `brew services stop mongodb/brew/mongodb-community`

---

For any issues, refer to the `blog-documentation.md` file for more details about the blog module architecture. 