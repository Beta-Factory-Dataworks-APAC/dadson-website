'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Sanity Studio
    router.push('/studio');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center p-8 max-w-md bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-medium text-[#101B21] mb-4">
          Redirecting to Admin Panel
        </h1>
        <p className="text-[#707C83] mb-6">
          You are being redirected to the Dadson Logistics Admin Panel...
        </p>
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B4E1] mx-auto"></div>
      </div>
    </div>
  );
} 