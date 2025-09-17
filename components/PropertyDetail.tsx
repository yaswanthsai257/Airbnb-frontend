import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property } from '../types';
import { fetchPropertyById } from '../services/propertyService';
import { fetchPropertyByIdFromAPI } from '../services/backendPropertyService';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon, ShareIcon, WifiIcon, CarIcon, SnowflakeIcon } from './icons/CoreIcons';
import { useLocalization } from '../hooks/useLocalization';
import Header from './Header';
import PropertyMap from './PropertyMap';

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const loadProperty = async () => {
      if (!id) return;
      
      try {
        let foundProperty: Property | null = null;
        
        // Try backend API first
        try {
          foundProperty = await fetchPropertyByIdFromAPI(id);
        } catch (error) {
          // Silently fallback to local data
        }
        
        // Fallback to local data if backend failed
        if (!foundProperty) {
          foundProperty = await fetchPropertyById(id);
        }
        
        setProperty(foundProperty);
      } catch (error) {
        console.error('Failed to fetch property:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProperty();
  }, [id]);

  const nextImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property) return;
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const handleToggleMap = () => {
    setShowMap(prev => !prev);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Property not found</h2>
          <button 
            onClick={() => navigate('/')}
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        showMap={showMap}
        onToggleMap={handleToggleMap}
      />

      <div className="container mx-auto px-4 py-6 pt-24">
        {/* Title and location */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center text-sm text-gray-600">
            <StarIcon className="h-4 w-4 mr-1" />
            <span className="font-semibold">{property.rating.toFixed(1)}</span>
            <span className="mx-2">•</span>
            <span className="underline">{property.location}</span>
          </div>
        </div>

        {/* Image gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden">
            <div className="aspect-[16/10] sm:aspect-[16/9]">
              <img
                src={property.images[currentImageIndex]}
                alt={property.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {property.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 transition"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
                
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {property.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="border-b pb-6 mb-6">
              <h2 className="text-xl font-semibold mb-2">Entire place hosted by Sarah</h2>
              <p className="text-gray-600">4 guests • 2 bedrooms • 2 beds • 1 bathroom</p>
            </div>

            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">What this place offers</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <WifiIcon className="h-5 w-5 mr-3" />
                  <span>Wifi</span>
                </div>
                <div className="flex items-center">
                  <CarIcon className="h-5 w-5 mr-3" />
                  <span>Free parking</span>
                </div>
                <div className="flex items-center">
                  <SnowflakeIcon className="h-5 w-5 mr-3" />
                  <span>Air conditioning</span>
                </div>
              </div>
            </div>

            <div className="border-b pb-6 mb-6">
              <h3 className="text-lg font-semibold mb-4">About this place</h3>
              <p className="text-gray-700 leading-relaxed">
                Experience the perfect blend of comfort and luxury in this beautifully designed space. 
                Located in the heart of {property.location}, this property offers stunning views and 
                modern amenities. Whether you're here for business or leisure, you'll find everything 
                you need for a memorable stay.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Where you'll be</h3>
              <p className="text-gray-700 mb-4">{property.location}</p>
              <div className="rounded-lg overflow-hidden border border-gray-200">
                <PropertyMap
                  property={property}
                  className="h-96"
                />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  <p>📍 {property.location}</p>
                  <p>📏 {property.distance} km from city center</p>
                </div>
                <button 
                  onClick={() => {
                    const url = `https://www.google.com/maps?q=${property.coordinates.lat},${property.coordinates.lng}`;
                    window.open(url, '_blank');
                  }}
                  className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Open in Maps
                </button>
              </div>
            </div>
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="border rounded-xl p-6 shadow-lg sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold">₹{property.price}</span>
                  <span className="text-gray-600"> night</span>
                </div>
                <div className="flex items-center">
                  <StarIcon className="h-4 w-4 mr-1" />
                  <span className="font-semibold">{property.rating.toFixed(1)}</span>
                </div>
              </div>

              <div className="border rounded-lg mb-4">
                <div className="grid grid-cols-2 border-b">
                  <div className="p-3 border-r">
                    <div className="text-xs font-bold">CHECK-IN</div>
                    <div className="text-sm">Add date</div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold">CHECK-OUT</div>
                    <div className="text-sm">Add date</div>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-xs font-bold">GUESTS</div>
                  <div className="text-sm">1 guest</div>
                </div>
              </div>

              <button className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition mb-4">
                Reserve
              </button>

              <p className="text-center text-sm text-gray-600 mb-4">You won't be charged yet</p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>₹{property.price} x 5 nights</span>
                  <span>₹{property.price * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning fee</span>
                  <span>₹500</span>
                </div>
                <div className="flex justify-between">
                  <span>Service fee</span>
                  <span>₹750</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-semibold">
                  <span>Total before taxes</span>
                  <span>₹{property.price * 5 + 1250}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
