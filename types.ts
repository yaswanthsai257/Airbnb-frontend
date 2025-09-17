
import type React from 'react';

export interface Category {
  id: string;
  label: { en: string; bn: string };
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface Property {
  id: string;
  title: string;
  location: string;
  distance: number;
  availableDates: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface FilterOptions {
  category?: string;
  location?: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: {
    adults: number;
    children: number;
    infants: number;
  };
  priceRange?: {
    min: number;
    max: number;
  };
}

export type Language = 'en' | 'bn';

export interface Translations {
  [key: string]: {
    [key in Language]: string;
  };
}
