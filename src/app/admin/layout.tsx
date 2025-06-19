import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog Admin Panel | Dadson Logistics',
  description: 'Admin panel for managing Dadson Logistics blog posts',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      {children}
    </div>
  );
}