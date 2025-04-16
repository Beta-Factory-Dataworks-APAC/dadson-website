import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      }
    ],
  },
  // async rewrites() { // Removing Payload CMS related rewrites
  //   return {
  //     beforeFiles: [
  //       // When deployed to Vercel, handle PayloadCMS routes through API
  //       {
  //         source: '/admin/:path*',
  //         destination: '/api/payload/admin/:path*',
  //       },
  //     ],
  //   };
  // },
};

export default nextConfig;
