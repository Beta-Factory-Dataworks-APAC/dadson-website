# Dadson Logistics Website

This is the official website for Dadson Logistics, built with Next.js, Tailwind CSS, and animations.

## Animation Library

The design specifications require the use of React Bits for animations (as specified in `PRD/docs/project/implementation_guide.md`). React Bits is a component library developed by David Haz that provides a collection of animated React components.

However, React Bits is not directly available as an npm package. Instead, it uses a CLI tool called jsrepo for installation. To properly implement React Bits:

1. Visit [reactbits.dev](https://reactbits.dev) for documentation
2. Follow the specific component installation instructions for each animation
3. Use the jsrepo CLI to install individual components

Until the proper React Bits setup is completed, we are temporarily using Framer Motion for animations. Framer Motion is already installed as a dependency in this project.

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/PRD` - Project documentation and design specifications
- `/payload` - PayloadCMS for blog content management

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Copy `.env.local.example` to `.env.local` and fill in the environment variables
4. Run the development server with `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technologies

- **Next.js**: React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework
- **React Bits**: Animation library (implementation pending)
- **PayloadCMS**: Self-hosted headless CMS for blog content
- **SendGrid**: Email service for contact form submission

## Blog Module

The blog module is powered by PayloadCMS, a self-hosted headless CMS solution. This provides a user-friendly admin interface for managing blog content while maintaining zero ongoing costs through self-hosting.

### Key Features

- **Self-hosted CMS**: No subscription costs
- **Rich Text Editor**: For creating engaging content
- **Media Management**: Upload and manage images
- **Categories**: Organize posts by topic
- **SEO Optimization**: Meta tags and Open Graph support
- **Responsive Design**: Optimized for all devices

### Setup Instructions

#### 1. PayloadCMS Setup

```bash
# Navigate to the PayloadCMS directory
cd payload/dadson-blog

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The admin interface will be available at http://localhost:3000/admin

#### 2. Frontend Setup

The Next.js frontend is already integrated with PayloadCMS. Make sure your environment variables are properly set in `.env.local`:

```
PAYLOAD_API_URL=http://localhost:3000/api
```

### Accessing the Blog

- **Blog Index**: `/blog`
- **Blog Post**: `/blog/[slug]`
- **Admin Panel**: http://localhost:3000/admin

### Documentation

- [PayloadCMS Documentation](payload/dadson-blog/README.md)
- [Integration Details](src/lib/payload/README.md)

## React Bits Implementation Plan

### Phase 1: Setup

1. Install jsrepo CLI globally:
   ```bash
   npm install -g jsrepo
   ```

2. Create a dedicated directory for React Bits components:
   ```bash
   mkdir -p src/lib/react-bits
   ```

3. Update package.json to include the installation process for React Bits components in the build script.

### Phase 2: Component Migration

1. Identify all current animations in the codebase that use Framer Motion:
   - ImageCarousel component in the About page
   - Any other animations in existing components

2. For each animation, find an equivalent in React Bits from [reactbits.dev](https://reactbits.dev):
   - Replace the ImageCarousel with an appropriate React Bits component
   - Configure the component with the same properties and behaviors

3. Create a React Bits animation wrapper to standardize usage:
   ```jsx
   // src/lib/react-bits/AnimationWrapper.tsx
   import React from 'react';
   
   // Import specific React Bits components as needed
   
   type AnimationWrapperProps = {
     type: 'fade' | 'slide' | 'carousel' | 'zoom' | 'bounce';
     children: React.ReactNode;
     [key: string]: any;
   };
   
   const AnimationWrapper = ({ type, children, ...props }: AnimationWrapperProps) => {
     // Return the appropriate React Bits animation component based on type
     
     // Default fallback if component not yet implemented
     return <>{children}</>;
   };
   
   export default AnimationWrapper;
   ```

### Phase 3: Implementation by Page

1. Contact Page (Current Focus):
   - Identify animation requirements for the contact page
   - Implement animations for form submission, input focus, and page transitions

2. Home Page:
   - Implement hero section animations
   - Add scroll-triggered animations for features and statistics
   - Create smooth transitions between sections

3. About Page:
   - Replace the current Framer Motion carousel with React Bits equivalent
   - Add reveal animations for team members and company information

4. Services Page:
   - Implement service card hover animations
   - Add transition effects between service descriptions

### Phase 4: Documentation & Standardization

1. Create a React Bits animation guide for the project:
   - Document all used components and their configurations
   - Provide examples for common animation patterns
   - Define animation timing and easing standards

2. Implement consistent animation behaviors across the site:
   - Standardize entrance/exit animations
   - Ensure consistent timing and easing functions
   - Create reusable animation configurations

## Features

- **Responsive Design**: Fully responsive website built with Tailwind CSS
- **Modern UI**: Clean and professional design following Dadson Logistics branding
- **Contact Form**: Integrated contact form with SendGrid for email notifications
- **Blog Module**: Full-featured blog with PayloadCMS for content management
- **Admin Panel**: Self-hosted admin panel for blog content management

## Deployment

The website is designed to be deployed on Vercel:

```bash
npm run build
```

For PayloadCMS deployment, see the [PayloadCMS deployment documentation](payload/dadson-blog/README.md#production-deployment).

For detailed Next.js deployment instructions, see the [deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
