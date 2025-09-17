
import React, { useEffect, useState } from 'react';
import PropertyCard from './PropertyCard';
import type { Property } from '../types';

interface PropertyListingsProps {
  properties: Property[];
  isLoading: boolean;
  isMapVisible?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
}

const SkeletonCard: React.FC = () => (
  <div className="animate-pulse">
    <div className="aspect-square bg-gray-300 rounded-xl"></div>
    <div className="h-4 bg-gray-300 rounded mt-4 w-3/4"></div>
    <div className="h-4 bg-gray-300 rounded mt-2 w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded mt-2 w-1/4"></div>
  </div>
);

const PropertyListings: React.FC<PropertyListingsProps> = ({ 
  properties, 
  isLoading, 
  isMapVisible = false,
  isMobile = false,
  isTablet = false
}) => {
  // Responsive grid classes based on map visibility and screen size
  const getGridClasses = () => {
    if (!isMapVisible) {
      // Full width when map is not visible
      if (isMobile) {
        return "grid grid-cols-1 gap-x-4 gap-y-6";
      } else if (isTablet) {
        return "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6";
      } else {
        return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-8";
      }
    }
    
    if (isMobile) {
      // Mobile with map: single column
      return "grid grid-cols-1 gap-x-3 gap-y-4";
    } else if (isTablet) {
      // Tablet with map: 1-2 columns
      return "grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-4";
    }
    
    // Desktop with map: fewer columns to fit in the available space
    return "grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6";
  };

  const getPaddingClasses = () => {
    if (isMobile) {
      return 'px-3 py-4';
    } else if (isTablet) {
      return 'px-4 py-4';
    } else {
      return isMapVisible ? 'px-4 py-4' : 'py-8';
    }
  };

  return (
    <div className={getPaddingClasses()}>
      <div className={getGridClasses()}>
        {isLoading
          ? Array.from({ length: isMapVisible ? (isMobile ? 6 : 10) : (isMobile ? 8 : 20) }).map((_, index) => (
              <SkeletonCard key={index} />
            ))
          : properties.map((property) => (
              <PropertyCard key={property.id} property={property} isMobile={isMobile} />
            ))}
      </div>
      {!isLoading && properties.length === 0 && (
        <div className="text-center col-span-full py-12 sm:py-20">
          <h2 className="text-xl sm:text-2xl font-semibold">No results found</h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">Try adjusting your filters to find what you're looking for.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyListings;
