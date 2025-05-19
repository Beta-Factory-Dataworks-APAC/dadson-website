# Dadson Logistics Blog Module

This is the blog module for the Dadson Logistics website, built with Next.js and PayloadCMS.

## Architecture

The blog module uses a modern JAMstack architecture:

- **Frontend**: Next.js (React framework)
- **CMS**: PayloadCMS (headless CMS)
- **Database**: MongoDB
- **API**: REST API with fallback mock data

## Prerequisites

- Node.js 16+
- MongoDB (installed via Homebrew)
- Git configured

## Setup Instructions

### 1. Environment Setup

1. Create a `.env` file in the PayloadCMS directory:
```bash
MONGODB_URI=mongodb://localhost:27017/dadson-blog
PAYLOAD_SECRET=your-secret-key
PAYLOAD_PUBLIC_SERVER_URL=http://localhost:3001
```

2. Create a `.env.local` file in the Next.js root directory:
```bash
NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
```

### 2. Database Setup

1. Start MongoDB:
```bash
brew services start mongodb/brew/mongodb-community
```

2. Create the database:
```bash
mongosh
use dadson-blog
```

### 3. PayloadCMS Setup

1. Install dependencies:
```bash
cd payload/dadson-blog
npm install
```

2. Create admin user:
```bash
node create-admin.js
```

3. Start PayloadCMS:
```bash
npm run dev
```

### 4. Next.js Setup

1. Install dependencies:
```bash
cd /path/to/project/root
npm install
```

2. Start Next.js:
```bash
npm run dev
```

## Accessing the Blog

- Blog frontend: http://localhost:3000/blog
- PayloadCMS admin: http://localhost:3001/admin

## Content Management

### Creating Content

1. Log in to PayloadCMS admin panel
2. Create categories first
3. Upload media files
4. Create articles with proper metadata

### Content Structure

- **Articles**: Blog posts with rich content
- **Categories**: Article categorization
- **Media**: Image and file storage
- **Users**: Content authors and editors

## Development

### Project Structure

```
payload/dadson-blog/
├── src/
│   ├── collections/     # Content collections
│   ├── fields/         # Custom field types
│   ├── blocks/         # Rich text blocks
│   ├── components/     # Admin UI components
│   ├── hooks/          # Custom hooks
│   ├── access/         # Access control
│   └── styles/         # Admin panel styles
├── media/              # Uploaded media files
└── payload.config.ts   # Main configuration
```

### API Endpoints

- `GET /api/articles`: List all articles
- `GET /api/articles?where[slug][equals]=<slug>`: Get article by slug
- `GET /api/categories`: List all categories
- `GET /api/media`: List all media files

### Fallback Mechanism

The blog system includes a fallback mechanism to use mock data when PayloadCMS is unavailable:

1. API calls first attempt to fetch from PayloadCMS
2. If PayloadCMS is unavailable, falls back to mock API
3. Mock data is served from `/src/app/api/blog/`

## Deployment

### Production Setup

1. Update environment variables for production
2. Set up MongoDB with authentication
3. Configure proper SSL/TLS
4. Update CORS settings

### Deployment Steps

1. Build PayloadCMS:
```bash
cd payload/dadson-blog
npm run build
```

2. Build Next.js:
```bash
cd /path/to/project/root
npm run build
```

3. Start services:
```bash
# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Start PayloadCMS
cd payload/dadson-blog
npm run start

# Start Next.js
cd /path/to/project/root
npm run start
```

## Troubleshooting

### Common Issues

1. **Port Conflicts**
   - Use `npm run dev:check-ports` to detect conflicts
   - Kill processes using ports 3000 and 3001
   - Configure alternative ports if needed

2. **MongoDB Connection**
   - Verify MongoDB is running
   - Check connection string in `.env`
   - Ensure database exists

3. **API Errors**
   - Check PayloadCMS is running
   - Verify API URL in `.env.local`
   - Check network connectivity

### Debugging Tools

1. **Port Check**:
```bash
npm run dev:check-ports
```

2. **MongoDB Status**:
```bash
brew services list | grep mongodb
```

3. **API Testing**:
```bash
curl http://localhost:3001/api/articles
```

## Contributing

1. Follow the established code style
2. Add proper documentation
3. Test changes thoroughly
4. Update documentation as needed

## License

This project is proprietary and confidential.

## Support

For support, contact the development team at [support@dadson.com](mailto:support@dadson.com). 