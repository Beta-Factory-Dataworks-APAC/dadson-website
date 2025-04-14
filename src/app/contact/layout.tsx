import React from 'react';
import '../globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dadson Logistics',
  description: 'Get in touch with Dadson Logistics for inquiries about our freight and logistics services.',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="font-satoshi antialiased bg-white">
        {children}
      </body>
    </html>
  );
} 