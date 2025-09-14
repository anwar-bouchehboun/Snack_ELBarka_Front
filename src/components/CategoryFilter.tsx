interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  allText: string;
}

export const CategoryFilter = ({ 
  categories, 
  selectedCategory, 
  onCategoryChange, 
  allText 
}: CategoryFilterProps) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => onCategoryChange('all')}
        className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
          selectedCategory === 'all'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
        }`}
      >
        {allText}
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm transition-all duration-200 ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};
