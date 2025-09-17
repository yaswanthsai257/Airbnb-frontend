import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import type { Property } from '../types';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icon for properties
const createCustomIcon = (price: number, isMobile: boolean = false) => {
  // Adjusted color ranges for Indian Rupee prices
  const color = price > 5000 ? '#FF385C' : price > 2000 ? '#FF8A00' : '#00A699';
  
  // Format price for display (add K for thousands)
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
    }
    return `₹${price}`;
  };

  const size = isMobile ? 32 : 40;
  const fontSize = isMobile ? 8 : 9;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border: 2px solid white;
        border-radius: 50%;
        width: ${size}px;
        height: ${size}px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: ${fontSize}px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        cursor: pointer;
        text-align: center;
        line-height: 1;
        padding: 2px;
      ">
        ${formatPrice(price)}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2]
  });
};

// Fallback to default marker if custom icon fails
const getMarkerIcon = (price: number, isMobile: boolean = false) => {
  try {
    return createCustomIcon(price, isMobile);
  } catch (error) {
    console.warn('Custom icon failed, using default:', error);
    return L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  }
};

interface MapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property) => void;
  className?: string;
  isMobile?: boolean;
  isTablet?: boolean;
}

const Map: React.FC<MapProps> = ({ 
  properties, 
  selectedProperty, 
  onPropertySelect,
  className = '',
  isMobile = false,
  isTablet = false
}) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([20.5937, 78.9629]); // Default to India center
  const [isMapReady, setIsMapReady] = useState(false);

  // Calculate center point based on properties
  const getCenter = () => {
    if (properties.length === 0) return [20.5937, 78.9629]; // Default to India center
    
    const avgLat = properties.reduce((sum, prop) => sum + prop.coordinates.lat, 0) / properties.length;
    const avgLng = properties.reduce((sum, prop) => sum + prop.coordinates.lng, 0) / properties.length;
    
    return [avgLat, avgLng] as [number, number];
  };

  // Update map center when properties change
  useEffect(() => {
    if (properties.length > 0) {
      const newCenter = getCenter();
      setMapCenter(newCenter);
      setIsMapReady(true);
    }
  }, [properties]);

  // Force re-render when properties change
  useEffect(() => {
    // This ensures the map updates when properties change
  }, [properties]);

  // If no properties, show a default map centered on India
  if (properties.length === 0) {
    return (
      <div className={`map-container ${className}`} style={{ height: '100%', width: '100%' }}>
        <div className="absolute top-2 left-2 z-10 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium border">
          Loading properties...
        </div>
        <MapContainer
          center={[20.5937, 78.9629]}
          zoom={6}
          style={{ height: '100%', width: '100%' }}
          className="rounded-lg"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    );
  }

  return (
    <div className={`map-container ${className}`} style={{ height: '100%', width: '100%' }}>
      <div className="absolute top-2 left-2 z-10 bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium border">
        {properties.length} properties found
      </div>
      <MapContainer
        center={mapCenter}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        key={`map-${properties.length}-${mapCenter[0]}-${mapCenter[1]}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.coordinates.lat, property.coordinates.lng]}
              icon={getMarkerIcon(property.price, isMobile)}
              eventHandlers={{
                click: () => onPropertySelect?.(property),
              }}
            >
            <Popup>
              <div className={`property-popup ${isMobile ? 'max-w-xs' : 'max-w-sm'}`}>
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className={`w-full ${isMobile ? 'h-24' : 'h-32'} object-cover rounded-lg mb-2`}
                />
                <h3 className={`font-semibold ${isMobile ? 'text-base' : 'text-lg'} mb-1`}>{property.title}</h3>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'} mb-2`}>{property.location}</p>
                <div className="flex items-center justify-between">
                      <span className={`${isMobile ? 'text-base' : 'text-lg'} font-bold text-gray-900`}>
                        ₹{property.price.toLocaleString()}
                        <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-normal text-gray-600`}> night</span>
                      </span>
                  <div className="flex items-center">
                    <span className={`${isMobile ? 'text-xs' : 'text-sm'}`}>★ {property.rating.toFixed(1)}</span>
                  </div>
                </div>
                <button 
                  className={`w-full mt-2 bg-black text-white ${isMobile ? 'py-1.5 px-3 text-sm' : 'py-2 px-4'} rounded-lg hover:bg-gray-800 transition-colors`}
                  onClick={() => onPropertySelect?.(property)}
                >
                  View Details
                </button>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
