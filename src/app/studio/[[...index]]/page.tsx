'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudioPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to homepage since we're using Payload CMS instead
    router.push('/');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p className="mb-4">This Sanity Studio has been replaced with Payload CMS.</p>
        <p>If you are not redirected automatically, <button 
          onClick={() => router.push('/')}
          className="text-blue-500 underline"
        >
          click here
        </button>.</p>
      </div>
    </div>
  );
} 