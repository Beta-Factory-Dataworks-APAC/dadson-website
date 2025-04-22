import { NextResponse } from 'next/server';

// Mock categories
const mockCategories = [
  { id: '1', name: 'Operations', slug: 'operations' },
  { id: '2', name: 'Strategy', slug: 'strategy' },
  { id: '3', name: 'Sustainability', slug: 'sustainability' },
  { id: '4', name: 'Technology', slug: 'technology' },
  { id: '5', name: 'Industry News', slug: 'industry-news' },
];

export async function GET() {
  return NextResponse.json({
    docs: mockCategories,
    totalDocs: mockCategories.length,
    page: 1,
    totalPages: 1,
  });
} 