# Dadson Logistics - Blog & Admin Panel PRD

## 1. Overview

This document outlines the requirements for implementing a blog/article module and admin panel for Dadson Logistics, extending the existing website functionality. The system will allow administrators to create, edit, and publish articles with a modern WYSIWYG editor while maintaining the design aesthetic of the main website.

## 2. Blog/Article Module

### 2.1 User-Facing Blog Features

#### Blog Index Page
- Grid layout of article cards matching the Dadson design aesthetic
- Each card displays:
  - Featured image
  - Title
  - Publication date
  - Short excerpt (150 characters)
  - Category/tag indicator
- Filtering options by category/tag
- Pagination or infinite scroll
- Responsive design across all devices

#### Article Page
- Clean, readable typography
- Featured image with parallax scroll effect
- Article content with proper formatting (headings, lists, quotes, etc.)
- Author information and publication date
- Social media sharing buttons
- Related articles section
- Next/previous article navigation
- "Back to blog" navigation

#### Navigation Integration
- "Blog" link in main navigation
- Featured article promotion on homepage (optional)

### 2.2 Technical Architecture for Blog

#### Content Management
- Headless CMS approach using **Sanity.io**
  - Structured content model for articles
  - Custom field schemas
  - Media management
  - Draft/preview functionality
  - Revision history

#### Frontend Implementation
- Next.js integration with Sanity
- Static generation for blog index and article pages
- Incremental Static Regeneration (ISR) for content updates
- GROQ queries for content fetching
- Optimized image loading with next/image

#### Performance Considerations
- Lazy-loaded images
- Content pre-fetching for related articles
- SEO optimization with structured data
- Mobile performance optimization

## 3. Admin Panel

### 3.1 Admin Interface

#### Authentication & Access Control
- Secure login system
- Role-based access control (Admin, Editor, Contributor)
- Password recovery workflow
- Session management

#### Dashboard
- Overview of published/draft content
- Quick access to recent articles
- Content performance metrics (views, engagement)
- System notifications

#### Content Management Interface
- Article listing with search and filters
- Content status indicators (draft, published, scheduled)
- Bulk actions (delete, publish, unpublish)
- User activity log

### 3.2 Content Creation Interface

#### WYSIWYG Editor
- Implementation using **TipTap** editor
  - Based on ProseMirror (industry standard)
  - Highly customizable
  - Extensible plugin system
  - Collaborative editing capabilities
  - Markdown support

#### Editor Features
- Rich text formatting (bold, italic, underline, etc.)
- Heading levels (H2-H6)
- Lists (ordered, unordered)
- Image embedding with caption and alignment options
- Video embedding
- Call-to-action blocks
- Quote blocks
- Code blocks with syntax highlighting
- Tables
- Custom components matching Dadson design

#### Media Management
- Image upload with drag-and-drop
- Image cropping and basic editing
- Media library integration
- File type validation

#### SEO Tools
- Meta title and description fields
- OG image selection
- URL slug customization
- SEO score/recommendations

### 3.3 Technical Implementation

#### Admin Framework
- Sanity Studio customization
  - Custom desk structure
  - Field validation
  - Document actions
  - Custom input components

#### Integration Points
- Authentication with JWT
- API endpoints for content operations
- Webhook configuration for content updates
- Preview API for draft content

#### Deployment
- Separate deployment for admin interface
- Environment configuration for staging/production

## 4. Implementation Plan

### 4.1 Development Phases

#### Phase 1: Blog Infrastructure
1. Set up Sanity.io schema
2. Create content models for articles
3. Implement basic admin interface
4. Develop blog index and article page templates

#### Phase 2: WYSIWYG Editor Integration
1. Customize TipTap editor
2. Implement custom components
3. Create image handling workflow
4. Set up draft preview system

#### Phase 3: Design Integration
1. Style blog pages to match Dadson design
2. Create custom block renderers
3. Implement animations and effects
4. Ensure responsive behavior

#### Phase 4: Testing & Refinement
1. Content creation workflow testing
2. Performance optimization
3. Accessibility review
4. Browser compatibility testing

## 5. Technical Stack

### 5.1 Core Technologies
- **Headless CMS**: Sanity.io
- **Editor**: TipTap (based on ProseMirror)
- **Frontend**: Next.js with existing design system
- **Image Optimization**: Sanity's Image Pipeline + next/image
- **Deployment**: Vercel (same as main site)

### 5.2 Key Dependencies
- `@sanity/client` - Sanity integration
- `@tiptap/react` - Editor framework
- `@tiptap/extension-*` - Editor extensions
- `next-sanity` - Next.js integration
- `@sanity/image-url` - Image transformations

## 6. Rationale for Technology Choices

### 6.1 Why Sanity.io?
- **Flexibility**: Highly customizable content structures
- **Developer Experience**: Excellent React-based admin UI
- **Performance**: CDN-backed API with fast response times
- **Image Handling**: Built-in image transformation service
- **Realtime**: Support for realtime updates
- **Pricing**: Generous free tier with reasonable scaling

### 6.2 Why TipTap?
- **Modern Architecture**: Based on ProseMirror (industry standard)
- **Extensibility**: Highly customizable ecosystem
- **Performance**: Optimized rendering and state management
- **Active Community**: Well-maintained with regular updates
- **Customization**: Can be styled to match any design system

### 6.3 Alternatives Considered
- **Traditional WordPress**: Rejected due to maintenance overhead and security concerns
- **Strapi**: Rejected due to more complex self-hosting requirements
- **Contentful**: Rejected due to pricing constraints at scale
- **CKEditor**: Rejected in favor of more modern TipTap

## 7. Maintenance Considerations

### 7.1 Ongoing Support
- Regular updates to Sanity Studio
- Editor extensions maintenance
- Content backup strategy
- User access management

### 7.2 Expansion Opportunities
- Comment system integration
- Newsletter subscription
- Content categorization enhancements
- Author profiles

## 8. Success Metrics

The blog system will be considered successful if:
- Administrators can easily create and publish content
- Content maintains design consistency with the main site
- Blog posts render correctly across all devices
- Load time for blog pages is under 2 seconds
- The system functions without technical issues for 3 months post-launch 