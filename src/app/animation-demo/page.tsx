'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import the ContactDemo component with no SSR
const ContactDemo = dynamic(() => import('@/components/contact/ContactDemo'), { ssr: false });

// Metadata needs to be in a separate file for client components
export default function AnimationDemoPage() {
  return (
    <main>
      <ContactDemo />
    </main>
  );
} 