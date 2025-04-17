import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us | Dadson Logistics',
  description: 'Get in touch with Dadson Logistics for inquiries about our freight and logistics services.',
};

export const viewport: Viewport = {
  themeColor: '#00B4E1',
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 