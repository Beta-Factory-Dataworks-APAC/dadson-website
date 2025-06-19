# Dadson Logistics Blog Startup Guide

This document provides quick instructions for starting the Dadson Logistics blog servers.

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Community Edition
- Git

### Option 1: Using the Startup Script (Recommended)

Run our start script to launch both servers at once:

```bash
./start-blog-stack.sh
```

This will:
- Start MongoDB if not running
- Launch PayloadCMS on port 3004
- Start Next.js on port 3003

### Option 2: Manual Startup

Start each component individually:

1. **Start MongoDB**:
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

2. **Start PayloadCMS** (use one of these methods):
   
   Method A - Direct execution:
   ```bash
   cd payload/dadson-blog
   cross-env PAYLOAD_CONFIG_PATH=src/payload.config.ts node --loader ts-node/esm src/server.ts
   ```
   
   Method B - Build and run production version:
   ```bash
   cd payload/dadson-blog
   npm run build
   npm run serve
   ```

3. **Start Next.js**:
   ```bash
   NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3004 npm run dev -- -p 3003
   ```

## Accessing the Blog

- **Website**: http://localhost:3003
- **Blog**: http://localhost:3003/blog
- **PayloadCMS Admin**: http://localhost:3004/admin
  - Login with:
    - Email: admin@dadson.com
    - Password: admin123

## Troubleshooting

If you encounter issues starting the servers, please refer to these documents:

- [Blog Functionality Report](blog-functionality-report.md) - Detailed report on current status
- [PayloadCMS Fix Guide](payload-cms-fix-guide.md) - Guide for fixing PayloadCMS issues 