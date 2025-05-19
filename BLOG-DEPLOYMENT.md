# Blog Deployment Guide

This document provides detailed instructions for deploying the Dadson Logistics blog functionality, which consists of two main components:

1. **Next.js Frontend** - The main website with blog pages
2. **PayloadCMS Backend** - The headless CMS for managing blog content

## Prerequisites

- Node.js 18+ and npm/pnpm
- MongoDB (production-ready instance)
- Domain name with DNS access
- SSL certificate (recommended)
- Server or cloud hosting environment

## Deployment Architecture

The recommended deployment architecture is:

```
                  ┌─────────────────┐
                  │                 │
                  │    MongoDB      │
                  │                 │
                  └────────┬────────┘
                           │
                           │
┌─────────────────┐  ┌─────▼─────────┐  ┌─────────────────┐
│                 │  │               │  │                 │
│   Next.js       │◄─┤  PayloadCMS   │  │   Admin Users   │
│   Frontend      │  │   Backend     │◄─┤                 │
│                 │  │               │  │                 │
└─────────────────┘  └───────────────┘  └─────────────────┘
```

## Step 1: MongoDB Setup

### Option A: MongoDB Atlas (Recommended for production)

1. Create an account on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new project and cluster
3. Set up a database user with password authentication
4. Allow network access from your server IPs
5. Get your connection string in format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/dadson-blog`

### Option B: Self-hosted MongoDB

1. Install MongoDB on your server
2. Secure your MongoDB instance with authentication
3. Configure MongoDB to accept connections from your application servers
4. Get your connection string in format: `mongodb://<username>:<password>@<server-ip>:<port>/dadson-blog`

## Step 2: PayloadCMS Backend Deployment

### Preparing for Deployment

1. Navigate to the PayloadCMS directory:
   ```
   cd payload/dadson-blog
   ```

2. Create a production build:
   ```
   npm run build
   ```

3. Create a `.env` file with production settings:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   PAYLOAD_SECRET=<generate-a-secure-random-string>
   PAYLOAD_PUBLIC_SERVER_URL=https://cms.yourdomain.com
   ```

### Option A: Deploy to a Node.js Server

1. Transfer the built PayloadCMS to your server
2. Install dependencies:
   ```
   npm install --production
   ```

3. Start the server with a process manager like PM2:
   ```
   npm install -g pm2
   pm2 start dist/server.js --name "dadson-cms"
   ```

4. Configure a reverse proxy with Nginx or Apache to expose the service

### Option B: Deploy as a Docker Container

1. Create a Dockerfile in the PayloadCMS directory:
   ```
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   COPY dist ./dist
   COPY node_modules ./node_modules
   
   EXPOSE 3000
   
   CMD ["node", "dist/server.js"]
   ```

2. Build and push your Docker image:
   ```
   docker build -t dadson-cms .
   docker tag dadson-cms:latest <your-registry>/dadson-cms:latest
   docker push <your-registry>/dadson-cms:latest
   ```

3. Deploy using Docker Compose or Kubernetes

## Step 3: Next.js Frontend Deployment

### Preparing for Deployment

1. Navigate to the project root directory
2. Create a `.env.production` file:
   ```
   NEXT_PUBLIC_PAYLOAD_URL=https://cms.yourdomain.com
   ```

3. Build the Next.js application:
   ```
   npm run build
   ```

### Option A: Vercel Deployment (Recommended)

1. Install the Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

3. Set the environment variables in the Vercel dashboard

### Option B: Self-hosted Deployment

1. Transfer the built Next.js app to your server
2. Install dependencies:
   ```
   npm install --production
   ```

3. Start the server with a process manager like PM2:
   ```
   pm2 start npm --name "dadson-website" -- start
   ```

4. Configure a reverse proxy with Nginx or Apache

## Step 4: Configure DNS and SSL

1. Set up DNS records:
   - `website.yourdomain.com` → Next.js Frontend
   - `cms.yourdomain.com` → PayloadCMS Backend

2. Set up SSL certificates for both domains (Let's Encrypt recommended)

3. Configure your web server (Nginx/Apache) with SSL settings

## Step 5: Initial CMS Setup

1. Access the PayloadCMS admin interface at `https://cms.yourdomain.com/admin`
2. Create an admin user
3. Create initial categories and test articles
4. Verify content appears on the frontend

## Monitoring and Maintenance

### PayloadCMS Maintenance

1. Set up regular database backups
2. Monitor logs and server performance
3. Set up health checks for the CMS endpoint

### Next.js Maintenance

1. Monitor frontend performance
2. Set up error logging and alerting
3. Configure caching strategies for optimal performance

## Troubleshooting

### Common Issues

1. **CMS Connection Errors**
   - Verify MongoDB connection string
   - Check network connectivity between CMS and database
   - Ensure MongoDB user has correct permissions

2. **Frontend Not Displaying Content**
   - Check NEXT_PUBLIC_PAYLOAD_URL is set correctly
   - Verify API endpoints are accessible
   - Check CORS settings on PayloadCMS

3. **Authentication Issues**
   - Check PayloadCMS JWT secret
   - Verify admin user credentials
   - Check for expiring tokens

## Security Considerations

1. Keep all servers and dependencies updated
2. Use strong passwords and secure secrets
3. Implement proper authentication for admin access
4. Configure firewalls to restrict access to critical services
5. Enable rate limiting for API endpoints

## Scaling Strategy

As traffic grows, consider these scaling options:

1. **Database Scaling**
   - Increase MongoDB resources
   - Implement sharding for large datasets
   - Consider read replicas for heavy read operations

2. **CMS Scaling**
   - Deploy multiple instances behind a load balancer
   - Implement caching for frequently accessed data
   - Use CDN for media assets

3. **Frontend Scaling**
   - Implement static generation for blog pages
   - Use CDN caching for static assets
   - Deploy multiple Next.js instances if needed

## Additional Resources

- [PayloadCMS Documentation](https://payloadcms.com/docs/production/deployment)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [MongoDB Production Notes](https://docs.mongodb.com/manual/administration/production-notes/)
- [Nginx Configuration Examples](https://www.nginx.com/resources/wiki/start/topics/examples/full/) 