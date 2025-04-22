import { NextResponse } from 'next/server';

// Mock blog data
const mockArticles = [
  {
    id: '1',
    title: 'Introduction to Logistics Management',
    slug: 'introduction-to-logistics-management',
    excerpt: 'Learn the basics of logistics management and how it can improve your business.',
    content: `
      <h2>What is Logistics Management?</h2>
      <p>Logistics management is the process of planning, implementing, and controlling the efficient flow of goods, services, and related information from the point of origin to the point of consumption.</p>
      
      <h3>Key Components</h3>
      <ul>
        <li>Transportation Management</li>
        <li>Warehouse Management</li>
        <li>Inventory Control</li>
        <li>Order Fulfillment</li>
      </ul>
    `,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088',
      alt: 'Logistics warehouse with workers',
    },
    author: {
      id: '1',
      name: 'John Smith',
    },
    category: {
      id: '1',
      name: 'Operations',
      slug: 'operations',
    },
    publishedDate: '2023-01-15T00:00:00.000Z',
    status: 'published',
  },
  {
    id: '2',
    title: 'Supply Chain Optimization Strategies',
    slug: 'supply-chain-optimization-strategies',
    excerpt: 'Discover effective strategies to optimize your supply chain and reduce costs.',
    content: `
      <h2>Why Supply Chain Optimization Matters</h2>
      <p>An optimized supply chain can significantly reduce costs, improve customer satisfaction, and increase competitive advantage.</p>
      
      <h3>Top Strategies</h3>
      <ul>
        <li>Demand Forecasting</li>
        <li>Inventory Optimization</li>
        <li>Supplier Relationship Management</li>
        <li>Technology Integration</li>
      </ul>
    `,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1494412519320-aa613df615a2',
      alt: 'Global supply chain map',
    },
    author: {
      id: '1',
      name: 'John Smith',
    },
    category: {
      id: '2',
      name: 'Strategy',
      slug: 'strategy',
    },
    publishedDate: '2023-02-22T00:00:00.000Z',
    status: 'published',
  },
  {
    id: '3',
    title: 'Sustainable Logistics Practices',
    slug: 'sustainable-logistics-practices',
    excerpt: 'Implement eco-friendly logistics practices to reduce your carbon footprint.',
    content: `
      <h2>The Importance of Sustainability in Logistics</h2>
      <p>Sustainable logistics practices not only benefit the environment but can also lead to cost savings and improved brand reputation.</p>
      
      <h3>Key Sustainable Practices</h3>
      <ul>
        <li>Route Optimization</li>
        <li>Alternative Fuel Vehicles</li>
        <li>Packaging Reduction</li>
        <li>Warehouse Energy Efficiency</li>
      </ul>
    `,
    featuredImage: {
      url: 'https://images.unsplash.com/photo-1623000751975-571d6e8abfcf',
      alt: 'Green logistics truck',
    },
    author: {
      id: '2',
      name: 'Sarah Johnson',
    },
    category: {
      id: '3',
      name: 'Sustainability',
      slug: 'sustainability',
    },
    publishedDate: '2023-03-10T00:00:00.000Z',
    status: 'published',
  },
];

// Mock categories
const mockCategories = [
  { id: '1', name: 'Operations', slug: 'operations' },
  { id: '2', name: 'Strategy', slug: 'strategy' },
  { id: '3', name: 'Sustainability', slug: 'sustainability' },
  { id: '4', name: 'Technology', slug: 'technology' },
  { id: '5', name: 'Industry News', slug: 'industry-news' },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const category = searchParams.get('category');

  if (slug) {
    // Get a single article by slug
    const article = mockArticles.find(article => article.slug === slug);
    
    if (!article) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }
    
    return NextResponse.json({ docs: [article] });
  } else if (category) {
    // Filter articles by category
    const filteredArticles = mockArticles.filter(
      article => article.category.slug === category
    );
    
    return NextResponse.json({
      docs: filteredArticles,
      totalDocs: filteredArticles.length,
      page: 1,
      totalPages: 1,
    });
  } else {
    // Return all articles
    return NextResponse.json({
      docs: mockArticles,
      totalDocs: mockArticles.length,
      page: 1,
      totalPages: 1,
    });
  }
}

export async function POST(request: Request) {
  return NextResponse.json({ message: 'POST not supported in mock API' }, { status: 405 });
} 