import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services | Dadson Logistics',
  description: 'Explore our comprehensive logistics services including Full Truckload, Intermodal, LTL, Warehousing, and Transloading.',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 