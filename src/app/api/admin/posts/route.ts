import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import TurndownService from 'turndown';

const CONTENT_DIR = path.join(process.cwd(), 'content', 'blog');

// Initialize turndown service for HTML to Markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  bulletListMarker: '-',
});

// Helper function to convert HTML to Markdown
function htmlToMarkdown(html: string): string {
  if (!html || html.trim() === '') return '';
  
  try {
    return turndownService.turndown(html);
  } catch (error) {
    console.error('Error converting HTML to Markdown:', error);
    return html; // Return original HTML if conversion fails
  }
}

// Ensure content directory exists
function ensureContentDir() {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
  }
}

// Get all posts
export async function GET() {
  try {
    ensureContentDir();
    
    const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.md'));
    const posts = files.map(filename => {
      const fullPath = path.join(CONTENT_DIR, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        filename,
        title: data.title || '',
        author: data.author || '',
        category: data.category || '',
        publishedDate: data.publishedDate || '',
        excerpt: data.excerpt || '',
        featuredImage: data.featuredImage || '',
        status: data.status || 'draft',
        content: content || '',
      };
    });

    // Sort by published date (newest first)
    posts.sort((a, b) => new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime());

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

// Create or update post
export async function POST(request: NextRequest) {
  try {
    ensureContentDir();
    
    const body = await request.json();
    const { title, author, category, publishedDate, excerpt, featuredImage, status, content } = body;

    // Validate required fields
    if (!title || !author || !category || !publishedDate || !excerpt || !content) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Convert HTML content to Markdown for storage
    const markdownContent = htmlToMarkdown(content);

    // Generate slug and filename from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim();
    
    const filename = slug + '.md';

    // Create frontmatter
    const frontmatter = {
      title,
      slug,
      excerpt,
      featuredImage: featuredImage || `https://images.unsplash.com/photo-1566746064867-27d21b74b4dc`,
      category,
      author,
      publishedDate,
      status,
    };

    // Create the full markdown content
    const fileContent = matter.stringify(markdownContent, frontmatter);

    // Write to file
    const fullPath = path.join(CONTENT_DIR, filename);
    fs.writeFileSync(fullPath, fileContent);

    return NextResponse.json({ 
      message: 'Post saved successfully',
      filename 
    });

  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

// Delete post
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const title = searchParams.get('title');

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Generate filename from title
    const filename = title
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .trim() + '.md';

    const fullPath = path.join(CONTENT_DIR, filename);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    // Delete the file
    fs.unlinkSync(fullPath);

    return NextResponse.json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}