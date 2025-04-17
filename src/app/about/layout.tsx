import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'About Us | Dadson Logistics',
  description: 'Learn about Dadson Logistics - our mission, responsibility, and operating model. We\'re building trust in freight through radical accountability and carrier-first culture.',
};

export const viewport: Viewport = {
  themeColor: '#00B4E1',
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 