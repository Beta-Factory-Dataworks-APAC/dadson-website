# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Commands
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

### Blog/CMS Development Commands
```bash
# Check for port conflicts before starting development
npm run dev:check-ports

# Kill all node processes and start development
npm run dev:clean

# Start PayloadCMS (blog CMS)
cd payload/dadson-blog
pnpm install
pnpm dev
```

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/PRD` - Project documentation and design specifications
- `/payload` - PayloadCMS for blog content management
- `/src/lib/react-bits` - Animation components with Framer Motion (to be replaced with React Bits)

## Architecture Overview

This is a Next.js website for Dadson Logistics with the following key features:

1. **Frontend**: Next.js 15+ with App Router, utilizing React 19
2. **Styling**: Tailwind CSS for all styling (no other CSS libraries allowed)
3. **Animations**: Currently using Framer Motion, but migrating to React Bits
4. **Blog System**: Self-hosted PayloadCMS for content management
5. **Database**: MongoDB for the blog CMS

## Development Process

Development should follow the implementation guide in `PRD/docs/project/implementation_guide.md` with strict adherence to:

1. **Pixel-Perfect Fidelity**: Exact match to Figma designs
2. **Technology Restrictions**: Only Next.js, Tailwind CSS, React Bits, SendGrid
3. **Implementation Order**:
   - Contact Page (current focus)
   - Home Page
   - About Page
   - Services Page
   - Blog Module (lower priority)

## Setting Up PayloadCMS for Blog Development

1. **Start MongoDB**
   ```bash
   brew services start mongodb/brew/mongodb-community
   ```

2. **Start PayloadCMS**
   ```bash
   cd payload/dadson-blog
   pnpm install
   pnpm dev
   ```
   - Admin panel will be available at http://localhost:3001/admin
   - Default login: admin@dadson.com / admin123

3. **Environment Setup**
   - Ensure your `.env.local` in project root has:
     ```
     NEXT_PUBLIC_PAYLOAD_URL=http://localhost:3001
     ```

## Animation Development Guidelines

This project uses a wrapper around Framer Motion that will eventually be replaced with React Bits.

- Current implementation: `src/lib/react-bits/AnimationWrapper.tsx`
- Animation types: fade, slide, zoom, bounce, carousel
- Special animations: `TruckAnimation.tsx` for the truck animation
- See `src/lib/react-bits/README.md` for detailed documentation

## Common Issues and Solutions

### Port Conflicts
If you experience port conflicts (default ports: Next.js on 3000, PayloadCMS on 3001):
```bash
# Check for port conflicts
npm run dev:check-ports
```

### MongoDB Connection Issues
```bash
# Check if MongoDB is running
brew services list
# Restart MongoDB if needed
brew services restart mongodb/brew/mongodb-community
```

### Blog/CMS Not Working
1. Ensure MongoDB is running
2. Ensure PayloadCMS is running on port 3001
3. Check `.env.local` has correct NEXT_PUBLIC_PAYLOAD_URL
4. Access admin panel directly at http://localhost:3001/admin