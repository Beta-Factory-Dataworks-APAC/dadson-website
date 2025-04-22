import { NextRequest, NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Check if we're in a redirect loop
  const redirectCount = parseInt(request.headers.get('x-redirect-count') || '0');
  
  // If we've redirected more than 5 times, stop redirecting
  if (redirectCount > 5) {
    console.log('Too many redirects, stopping redirect chain');
    
    // Create a simple response to break the redirect loop
    return new NextResponse(
      JSON.stringify({
        error: 'Too many redirects',
        message: 'The server detected a redirect loop'
      }),
      {
        status: 508,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
  
  // For blog API routes, bypass any redirects and serve mock data
  if (request.nextUrl.pathname.startsWith('/api/blog')) {
    return NextResponse.next();
  }
  
  // For blog pages, handle potential redirect issues
  if (request.nextUrl.pathname.startsWith('/blog')) {
    // For now, just increment the redirect counter to track redirect loops
    const headers = new Headers(request.headers);
    headers.set('x-redirect-count', (redirectCount + 1).toString());
    
    return NextResponse.next({
      request: {
        headers
      }
    });
  }
  
  // Continue for all other routes
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/blog/:path*', '/api/blog/:path*']
}; 