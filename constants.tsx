
import React from 'react';
import type { Category } from './types';
import { AmazingViewsIcon, TinyHomesIcon, ChefsKitchensIcon, SurfingIcon, MansionsIcon, LuxeIcon, TreehousesIcon, CampingIcon, BeachfrontIcon, FarmsIcon, CastlesIcon, IslandsIcon } from './components/icons/CategoryIcons';

// API Base URL - automatically uses the correct URL for production and development
export const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:5000/api';

export const CATEGORIES: Category[] = [
  { id: 'amazing_views', label: { en: 'Amazing views', bn: 'আশ্চর্যজনক দৃশ্য' }, icon: AmazingViewsIcon },
  { id: 'tiny_homes', label: { en: 'Tiny homes', bn: 'ছোট বাড়ি' }, icon: TinyHomesIcon },
  { id: 'chefs_kitchens', label: { en: 'Chef\'s kitchens', bn: 'শেফের রান্নাঘর' }, icon: ChefsKitchensIcon },
  { id: 'surfing', label: { en: 'Surfing', bn: 'সার্ফিং' }, icon: SurfingIcon },
  { id: 'mansions', label: { en: 'Mansions', bn: 'প্রাসাদ' }, icon: MansionsIcon },
  { id: 'luxe', label: { en: 'Luxe', bn: 'বিলাসবহুল' }, icon: LuxeIcon },
  { id: 'treehouses', label: { en: 'Treehouses', bn: 'গাছবাড়ি' }, icon: TreehousesIcon },
  { id: 'camping', label: { en: 'Camping', bn: 'ক্যাম্পিং' }, icon: CampingIcon },
  { id: 'beachfront', label: { en: 'Beachfront', bn: 'সৈকতের সামনে' }, icon: BeachfrontIcon },
  { id: 'farms', label: { en: 'Farms', bn: 'খামার' }, icon: FarmsIcon },
  { id: 'castles', label: { en: 'Castles', bn: 'দুর্গ' }, icon: CastlesIcon },
  { id: 'islands', label: { en: 'Islands', bn: 'দ্বীপ' }, icon: IslandsIcon },
];
