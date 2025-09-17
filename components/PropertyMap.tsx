import React, { useEffect } from 'react';
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

// Custom marker icon for property detail
const createPropertyDetailIcon = (price: number) => {
  const color = price > 5000 ? '#FF385C' : price > 2000 ? '#FF8A00' : '#00A699';

  // Format price for display (add K for thousands)
  const formatPrice = (price: number) => {
    if (price >= 1000) {
      return `₹${(price / 1000).toFixed(price % 1000 === 0 ? 0 : 1)}K`;
    }
    return `₹${price}`;
  };

  return L.divIcon({
    className: 'property-detail-marker',
    html: `
      <div style="
        background-color: ${color};
        color: white;
        border: 3px solid white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 11px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        cursor: pointer;
        text-align: center;
        line-height: 1;
        padding: 2px;
      ">
        ${formatPrice(price)}
      </div>
    `,
    iconSize: [50, 50],
    iconAnchor: [25, 25],
    popupAnchor: [0, -25]
  });
};

// Fallback to default marker if custom icon fails
const getPropertyDetailIcon = (price: number) => {
  try {
    return createPropertyDetailIcon(price);
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

interface PropertyMapProps {
  property: Property;
  className?: string;
}

const PropertyMap: React.FC<PropertyMapProps> = ({ property, className = '' }) => {
  // Force re-render when property changes
  useEffect(() => {
    // This ensures the map updates when property changes
  }, [property]);

  return (
    <div className={`property-detail-map ${className}`} style={{ height: '100%', width: '100%' }}>
      <MapContainer
        center={[property.coordinates.lat, property.coordinates.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker
          position={[property.coordinates.lat, property.coordinates.lng]}
          icon={getPropertyDetailIcon(property.price)}
        >
          <Popup>
            <div className="property-detail-popup">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-bold text-lg mb-2">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{property.location}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-gray-900">
                  ₹{property.price.toLocaleString()}
                  <span className="text-sm font-normal text-gray-600"> night</span>
                </span>
                <div className="flex items-center">
                  <span className="text-sm">★ {property.rating.toFixed(1)}</span>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>Available: {property.availableDates}</p>
                <p>Distance: {property.distance} km away</p>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
