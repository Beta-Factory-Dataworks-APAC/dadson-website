# Blog Module Debugging Prompt

## Your Task

Your task is to debug the Dadson Logistics blog module using a practical, observation-based approach rather than creating extensive test cases. Focus on understanding and fixing the actual integration issues between Next.js, PayloadCMS, and MongoDB.

## Essential Context

- The blog module uses Next.js (frontend), PayloadCMS (CMS), and MongoDB (database)
- There are known port conflicts between Next.js (3000) and PayloadCMS (3001)
- A port conflict detection script (`check-ports.js`) has been implemented
- The blog has a fallback mechanism to use mock data when PayloadCMS is unavailable
- Documentation exists in `blog-documentation.md` and `blog-status-report.md`

## Step-by-Step Approach

### 1. Initial Documentation & Port Verification

```bash
# First, check for port conflicts
npm run dev:check-ports

# Take screenshots of the output and document the results

# Check what processes are using the relevant ports
lsof -i :3000
lsof -i :3001

# Take screenshots of this output too
```

### 2. MongoDB and PayloadCMS Verification

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Start MongoDB if needed
brew services start mongodb/brew/mongodb-community

# Navigate to PayloadCMS directory
cd payload/dadson-blog

# Check PayloadCMS configuration
cat .env
# Screenshot this output

# Start PayloadCMS and capture the output
npm run dev
# Screenshot any errors that appear
```

### 3. API Connection Testing

```bash
# In a new terminal, test the PayloadCMS API directly
curl http://localhost:3001/api/articles
# Screenshot this output

# Test the mock API
curl http://localhost:3000/api/blog
# Screenshot this output

# Test categories endpoint
curl http://localhost:3001/api/categories
curl http://localhost:3000/api/blog/categories
# Screenshot both outputs
```

### 4. Frontend Visual Testing

```bash
# Start the Next.js app (in a new terminal)
cd /path/to/project/root
npm run dev

# Visit these URLs in your browser and take screenshots:
# - http://localhost:3000/blog
# - http://localhost:3001/admin (PayloadCMS admin)
# Also open browser dev tools and capture network requests
```

### 5. Incremental Fixing

For each issue you discover:

1. Document it with screenshots
2. Identify the root cause
3. Implement a focused fix
4. Verify the fix works
5. Document what you did

### 6. Critical Areas to Check

- Environment variable configuration in both Next.js and PayloadCMS
- API URLs and fallback mechanisms
- MongoDB connection string and authentication
- CORS settings between services
- Component rendering with real vs. mock data

## Deliverables

As you work, create these deliverables:

1. **Visual Evidence Document**: A markdown file with screenshots of each step
2. **Issue & Fix Log**: Document each issue and how you fixed it
3. **Updated Configuration**: Any environment variables or settings that needed changing
4. **Working State Proof**: Final screenshots showing the working blog

## Why This Approach Works

This observation-first approach helps you:

1. Identify actual issues, not theoretical ones
2. Build a visual record for documentation and knowledge sharing
3. Fix the most critical issues first
4. Understand how the system truly operates
5. Create useful documentation as a byproduct of your debugging

Remember: Your goal is a working blog system, not perfect test coverage. Focus on practical solutions that get real results.

Good luck! 