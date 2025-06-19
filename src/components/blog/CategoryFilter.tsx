'use client';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  // Sort categories alphabetically by name
  const sortedCategories = [...categories].sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
  
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium text-[#101B21] mb-4">Filter by Category</h2>
      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-6 py-2.5 rounded-md border transition-all duration-200 font-medium ${
            selectedCategory === null
              ? 'bg-[#00B4E1] text-white border-[#00B4E1] shadow-sm'
              : 'bg-white text-[#101B21] border-[#E3E3E3] hover:bg-gray-50 hover:border-[#00B4E1] hover:text-[#00B4E1]'
          }`}
        >
          All
        </button>
        
        {sortedCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={`px-6 py-2.5 rounded-md border transition-all duration-200 font-medium ${
              selectedCategory === category.slug
                ? 'bg-[#00B4E1] text-white border-[#00B4E1] shadow-sm'
                : 'bg-white text-[#101B21] border-[#E3E3E3] hover:bg-gray-50 hover:border-[#00B4E1] hover:text-[#00B4E1]'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
} 