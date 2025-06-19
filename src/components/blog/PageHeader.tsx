import Link from 'next/link';

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-16 text-center max-w-3xl mx-auto relative">
      <h1 className="text-4xl md:text-5xl font-medium uppercase text-[#101B21] mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[#707C83]">{description}</p>
      )}
      <div className="mt-8 w-24 h-1 bg-[#00B4E1] mx-auto rounded-full"></div>
      
      {/* Admin Panel Link */}
      <div className="absolute top-0 right-0">
        <Link
          href="/admin"
          className="text-sm text-[#707C83] hover:text-[#00B4E1] transition-colors opacity-50 hover:opacity-100"
          title="Blog Admin Panel"
        >
          ⚙️ Admin
        </Link>
      </div>
    </div>
  );
} 