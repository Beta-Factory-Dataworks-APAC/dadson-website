import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Services | Dadson Logistics',
  description: 'Explore our comprehensive freight services including Full Truckload (FTL), Intermodal & Drayage, Less Than Truckload (LTL), Warehousing, and Transloading. We keep freight moving safely and efficiently.',
};

export const viewport: Viewport = {
  themeColor: '#00B4E1',
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 