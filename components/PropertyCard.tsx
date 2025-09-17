import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Property } from '../types';
import { StarIcon, HeartIcon, ChevronLeftIcon, ChevronRightIcon } from './icons/CoreIcons';
import { useLocalization } from '../hooks/useLocalization';

interface PropertyCardProps {
  property: Property;
  isMobile?: boolean;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, isMobile = false }) => {
  const navigate = useNavigate();
  const { t } = useLocalization();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % property.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + property.images.length) % property.images.length);
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLiked(!isLiked);
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div onClick={handleCardClick} className="group cursor-pointer w-full max-w-sm property-card">
      <div className="relative">
        <div className={`${isMobile ? 'aspect-[4/3]' : 'aspect-square'} w-full overflow-hidden rounded-xl bg-gray-200`}>
          <img
            src={property.images[currentImageIndex]}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <button onClick={handleLikeClick} className={`absolute top-2 right-2 text-white ${isMobile ? 'p-1' : ''}`}>
          <HeartIcon
            className={`${isMobile ? 'h-5 w-5' : 'h-6 w-6'}`}
            fill={isLiked ? '#FF385C' : 'rgba(0,0,0,0.5)'}
            stroke="white"
            strokeWidth="2"
          />
        </button>
        {property.images.length > 1 && (
          <>
            <button onClick={prevImage} className={`absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 rounded-full p-1 ${isMobile ? 'opacity-100' : 'opacity-100 lg:opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <ChevronLeftIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </button>
            <button onClick={nextImage} className={`absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 rounded-full p-1 ${isMobile ? 'opacity-100' : 'opacity-100 lg:opacity-0 group-hover:opacity-100'} transition-opacity`}>
                <ChevronRightIcon className={`${isMobile ? 'h-3 w-3' : 'h-4 w-4'}`} />
            </button>
             <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                {property.images.map((_, index) => (
                    <div key={index} className={`${isMobile ? 'w-1 h-1' : 'w-1.5 h-1.5'} rounded-full ${index === currentImageIndex ? 'bg-white' : 'bg-white/50'}`}></div>
                ))}
            </div>
          </>
        )}
      </div>
      <div className={`${isMobile ? 'mt-2' : 'mt-2'}`}>
        <div className="flex justify-between items-start">
          <h3 className={`${isMobile ? 'font-medium text-sm' : 'font-semibold'} text-gray-900 truncate pr-2`}>{property.title}</h3>
          <div className="flex items-center space-x-1 flex-shrink-0">
            <StarIcon className={`${isMobile ? 'h-3 w-3' : 'h-3.5 w-3.5'}`} />
            <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-800`}>{property.rating.toFixed(1)}</span>
          </div>
        </div>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500 truncate`}>{property.location}</p>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{property.distance} {t('kilometers_away')}</p>
        <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-500`}>{property.availableDates}</p>
        <p className={`${isMobile ? 'mt-1' : 'mt-1'}`}>
          <span className={`${isMobile ? 'font-semibold text-sm' : 'font-semibold'}`}>₹{property.price.toLocaleString()}</span>
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-800`}> {t('night')}</span>
        </p>
      </div>
    </div>
  );
};

export default PropertyCard;