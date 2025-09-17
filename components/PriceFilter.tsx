import React, { useState } from 'react';
import type { FilterOptions } from '../types';

interface PriceFilterProps {
  priceRange?: FilterOptions['priceRange'];
  onPriceRangeChange: (priceRange: FilterOptions['priceRange']) => void;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ priceRange, onPriceRangeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [tempRange, setTempRange] = useState({
    min: priceRange?.min || 0,
    max: priceRange?.max || 5000
  });

  const priceRanges = [
    { label: 'Any price', min: 0, max: 10000 },
    { label: 'Under ₹1000', min: 0, max: 1000 },
    { label: '₹1000 - ₹2000', min: 1000, max: 2000 },
    { label: '₹2000 - ₹3000', min: 2000, max: 3000 },
    { label: '₹3000 - ₹5000', min: 3000, max: 5000 },
    { label: '₹5000+', min: 5000, max: 10000 }
  ];

  const handleRangeSelect = (range: { min: number; max: number }) => {
    setTempRange(range);
    onPriceRangeChange(range);
    setIsOpen(false);
  };

  const handleCustomRange = () => {
    onPriceRangeChange(tempRange);
    setIsOpen(false);
  };

  const getCurrentRangeLabel = () => {
    if (!priceRange) return 'Any price';
    const range = priceRanges.find(r => r.min === priceRange.min && r.max === priceRange.max);
    return range ? range.label : `₹${priceRange.min} - ₹${priceRange.max}`;
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow bg-white"
      >
        <span className="text-sm font-medium text-gray-700">{getCurrentRangeLabel()}</span>
        <svg 
          className={`ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-lg border z-50">
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Price range</h3>
            
            {/* Quick select options */}
            <div className="space-y-2 mb-4">
              {priceRanges.map((range, index) => (
                <button
                  key={index}
                  onClick={() => handleRangeSelect(range)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    priceRange?.min === range.min && priceRange?.max === range.max
                      ? 'bg-gray-100 text-gray-900'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>

            {/* Custom range */}
            <div className="border-t pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Custom range</p>
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Min price</label>
                  <input
                    type="number"
                    value={tempRange.min}
                    onChange={(e) => setTempRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="0"
                  />
                </div>
                <span className="text-gray-400 mt-6">-</span>
                <div className="flex-1">
                  <label className="block text-xs text-gray-500 mb-1">Max price</label>
                  <input
                    type="number"
                    value={tempRange.max}
                    onChange={(e) => setTempRange(prev => ({ ...prev, max: parseInt(e.target.value) || 1000 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="5000"
                  />
                </div>
              </div>
              <button
                onClick={handleCustomRange}
                className="w-full bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;
