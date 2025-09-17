import React from 'react';
import { CATEGORIES } from '../constants';
import { useLocalization } from '../hooks/useLocalization';

interface CategoryBarProps {
  selectedCategory?: string;
  onSelectCategory: (categoryId: string) => void;
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onSelectCategory }) => {
  const { language } = useLocalization();

  return (
    <div className="sticky top-20 bg-white z-40 py-4 -mt-4 border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Gradient fade for scroll indication */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none sm:hidden"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none sm:hidden"></div>
          
          <div className="flex justify-start sm:justify-center">
            <div className="flex space-x-6 sm:space-x-8 overflow-x-auto no-scrollbar pb-2 max-w-full">
              {CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onSelectCategory(category.id)}
                  className={`flex flex-col items-center space-y-2 flex-shrink-0 group min-w-max px-2 py-2 transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'text-gray-900 transform scale-105' 
                      : 'text-gray-500 hover:text-gray-900 hover:scale-105'
                  }`}
                >
                  <category.icon className="h-6 w-6" />
                  <span className="text-xs font-medium whitespace-nowrap">{category.label[language]}</span>
                  <div className={`w-full h-0.5 mt-1 transition-all duration-200 ${
                    selectedCategory === category.id 
                      ? 'bg-gray-900 scale-x-100' 
                      : 'bg-transparent group-hover:bg-gray-300 scale-x-0 group-hover:scale-x-100'
                  }`}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryBar;