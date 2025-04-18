/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // Ensure static files are properly handled
  output: 'standalone',
  // Enable React strict mode for better development
  reactStrictMode: true,
  // Experimental features
  experimental: {
    // Improve client-side navigation
    scrollRestoration: true
  }
}

module.exports = nextConfig 