import React, { useState, useEffect } from 'react';
import Map from './Map';
import PropertyListings from './PropertyListings';
import type { Property } from '../types';

interface MapViewProps {
  properties: Property[];
  isLoading: boolean;
  showMap: boolean;
  onPropertySelect?: (property: Property) => void;
}

const MapView: React.FC<MapViewProps> = ({ 
  properties, 
  isLoading, 
  showMap,
  onPropertySelect 
}) => {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  // Check device type for responsive behavior
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile: < 768px
      setIsTablet(width >= 768 && width < 1024); // Tablet: 768px - 1023px
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const handlePropertySelect = (property: Property) => {
    setSelectedProperty(property);
    onPropertySelect?.(property);
  };

  // Force map re-render when showMap changes or properties change
  useEffect(() => {
    if (showMap && properties.length > 0) {
      setMapKey(prev => prev + 1);
    }
  }, [showMap, properties.length]);


  // Get responsive layout classes
  const getLayoutClasses = () => {
    if (!showMap) return '';
    
    if (isMobile) {
      return 'flex flex-col';
    } else if (isTablet) {
      return 'flex flex-col lg:flex-row';
    } else {
      return 'flex flex-row';
    }
  };

  const getPropertyListClasses = () => {
    if (!showMap) return '';
    
    if (isMobile) {
      return 'order-2';
    } else if (isTablet) {
      return 'order-2 lg:order-1 lg:flex-1';
    } else {
      return 'order-1 flex-1';
    }
  };

  const getMapClasses = () => {
    if (isMobile) {
      return 'order-1 h-80 sm:h-96';
    } else if (isTablet) {
      return 'order-1 h-96 lg:order-2 lg:w-1/2 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]';
    } else {
      return 'order-2 w-1/2 xl:w-1/3 sticky top-16 h-[calc(100vh-4rem)]';
    }
  };

  return (
    <div className="relative">
      {/* Content - Responsive layout */}
      <div className={`transition-all duration-300 ${getLayoutClasses()}`}>
        {/* Property Listings */}
        <div className={getPropertyListClasses()}>
          <PropertyListings 
            properties={properties} 
            isLoading={isLoading}
            isMapVisible={showMap}
            isMobile={isMobile}
            isTablet={isTablet}
          />
        </div>

        {/* Map */}
        {showMap && (
          <div className={`${getMapClasses()}`} style={{ minHeight: isMobile ? '320px' : '400px' }}>
            {isLoading ? (
              <div className="h-full flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                  <p className="text-gray-600 text-sm">Loading map...</p>
                </div>
              </div>
            ) : (
              <Map
                key={`map-${mapKey}-${properties.length}`}
                properties={properties}
                selectedProperty={selectedProperty}
                onPropertySelect={handlePropertySelect}
                className="h-full"
                isMobile={isMobile}
                isTablet={isTablet}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
