interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="mb-16 text-center max-w-3xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-medium uppercase text-[#101B21] mb-4">
        {title}
      </h1>
      {description && (
        <p className="text-lg text-[#707C83]">{description}</p>
      )}
      <div className="mt-8 w-24 h-1 bg-[#00B4E1] mx-auto rounded-full"></div>
    </div>
  );
} 