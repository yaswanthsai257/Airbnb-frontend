import type { Property, FilterOptions } from '../types';
import { fetchPropertiesFromAPI, fetchPropertyByIdFromAPI } from './backendPropertyService';

// Mock properties data with Indian cities
const mockProperties: Property[] = [
  // Amazing Views - South Indian Cities
  {
    id: '1',
    title: '2BHK in Bangalore',
    location: 'Koramangala, Bangalore',
    distance: 5,
    availableDates: 'Dec 15-20',
    price: 2500,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400'],
    category: 'amazing_views',
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: '2',
    title: '3BHK in Chennai',
    location: 'T. Nagar, Chennai',
    distance: 8,
    availableDates: 'Jan 5-10',
    price: 2200,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400'],
    category: 'amazing_views',
    coordinates: { lat: 13.0827, lng: 80.2707 }
  },
  {
    id: '3',
    title: '1BHK in Hyderabad',
    location: 'Gachibowli, Hyderabad',
    distance: 12,
    availableDates: 'Feb 10-15',
    price: 1800,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    category: 'amazing_views',
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },

  // Chef's Kitchens - North Indian Cities
  {
    id: '4',
    title: '2BHK in Delhi',
    location: 'Connaught Place, Delhi',
    distance: 3,
    availableDates: 'Nov 20-25',
    price: 3000,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    category: 'chefs_kitchens',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: '5',
    title: '3BHK in Mumbai',
    location: 'Bandra West, Mumbai',
    distance: 6,
    availableDates: 'Dec 1-6',
    price: 4500,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    category: 'chefs_kitchens',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: '6',
    title: '1BHK in Pune',
    location: 'Koregaon Park, Pune',
    distance: 10,
    availableDates: 'Mar 15-20',
    price: 2000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400'],
    category: 'chefs_kitchens',
    coordinates: { lat: 18.5204, lng: 73.8567 }
  },

  // Beachfront - Coastal Cities
  {
    id: '7',
    title: '2BHK in Goa',
    location: 'Calangute, Goa',
    distance: 15,
    availableDates: 'Apr 10-15',
    price: 3500,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400'],
    category: 'beachfront',
    coordinates: { lat: 15.4909, lng: 73.8278 }
  },
  {
    id: '8',
    title: '1BHK in Kochi',
    location: 'Fort Kochi, Kerala',
    distance: 20,
    availableDates: 'May 5-10',
    price: 1500,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400'],
    category: 'beachfront',
    coordinates: { lat: 9.9312, lng: 76.2673 }
  },
  {
    id: '9',
    title: '3BHK in Puducherry',
    location: 'White Town, Puducherry',
    distance: 25,
    availableDates: 'Jun 20-25',
    price: 2800,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1520637836862-4d197d17c93a?w=400'],
    category: 'beachfront',
    coordinates: { lat: 11.9416, lng: 79.8083 }
  },

  // Mansions - Luxury Properties
  {
    id: '10',
    title: '4BHK Villa in Gurgaon',
    location: 'DLF Phase 2, Gurgaon',
    distance: 18,
    availableDates: 'Jul 1-6',
    price: 8000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'],
    category: 'mansions',
    coordinates: { lat: 28.4595, lng: 77.0266 }
  },
  {
    id: '11',
    title: '5BHK in Noida',
    location: 'Sector 62, Noida',
    distance: 22,
    availableDates: 'Aug 10-15',
    price: 6000,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'],
    category: 'mansions',
    coordinates: { lat: 28.5355, lng: 77.3910 }
  },
  {
    id: '12',
    title: '3BHK in Chandigarh',
    location: 'Sector 17, Chandigarh',
    distance: 30,
    availableDates: 'Sep 5-10',
    price: 4000,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400'],
    category: 'mansions',
    coordinates: { lat: 30.7333, lng: 76.7794 }
  },

  // Tiny Homes - Budget Options
  {
    id: '13',
    title: 'Studio in Mysore',
    location: 'Vijayanagar, Mysore',
    distance: 35,
    availableDates: 'Oct 15-20',
    price: 800,
    rating: 4.6,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'],
    category: 'tiny_homes',
    coordinates: { lat: 12.2958, lng: 76.6394 }
  },
  {
    id: '14',
    title: '1BHK in Coimbatore',
    location: 'RS Puram, Coimbatore',
    distance: 40,
    availableDates: 'Nov 1-6',
    price: 1200,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'],
    category: 'tiny_homes',
    coordinates: { lat: 11.0168, lng: 76.9558 }
  },
  {
    id: '15',
    title: 'Studio in Madurai',
    location: 'Anna Nagar, Madurai',
    distance: 45,
    availableDates: 'Dec 10-15',
    price: 900,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400'],
    category: 'tiny_homes',
    coordinates: { lat: 9.9252, lng: 78.1198 }
  },

  // Treehouses - Unique Stays
  {
    id: '16',
    title: 'Treehouse in Ooty',
    location: 'Coonoor, Ooty',
    distance: 50,
    availableDates: 'Jan 20-25',
    price: 2000,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    category: 'treehouses',
    coordinates: { lat: 11.3548, lng: 76.8020 }
  },
  {
    id: '17',
    title: 'Jungle House in Munnar',
    location: 'Devikulam, Munnar',
    distance: 55,
    availableDates: 'Feb 15-20',
    price: 1800,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    category: 'treehouses',
    coordinates: { lat: 10.0889, lng: 77.0595 }
  },
  {
    id: '18',
    title: 'Mountain Retreat in Kodaikanal',
    location: 'Kodaikanal, Tamil Nadu',
    distance: 60,
    availableDates: 'Mar 10-15',
    price: 2200,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400'],
    category: 'treehouses',
    coordinates: { lat: 10.2381, lng: 77.4892 }
  },

  // Countryside - Rural Properties
  {
    id: '19',
    title: 'Farmhouse in Coorg',
    location: 'Madikeri, Coorg',
    distance: 65,
    availableDates: 'Apr 5-10',
    price: 2500,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    category: 'countryside',
    coordinates: { lat: 12.4201, lng: 75.7397 }
  },
  {
    id: '20',
    title: 'Villa in Udaipur',
    location: 'Lake Pichola, Udaipur',
    distance: 70,
    availableDates: 'May 20-25',
    price: 3500,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    category: 'countryside',
    coordinates: { lat: 24.5854, lng: 73.7125 }
  },
  {
    id: '21',
    title: 'Cottage in Shimla',
    location: 'Mall Road, Shimla',
    distance: 75,
    availableDates: 'Jun 15-20',
    price: 2800,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400'],
    category: 'countryside',
    coordinates: { lat: 31.1048, lng: 77.1734 }
  },

  // Trending - Popular Destinations
  {
    id: '22',
    title: '2BHK in Jaipur',
    location: 'Pink City, Jaipur',
    distance: 80,
    availableDates: 'Jul 10-15',
    price: 2000,
    rating: 4.8,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'trending',
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: '23',
    title: '1BHK in Kolkata',
    location: 'Park Street, Kolkata',
    distance: 85,
    availableDates: 'Aug 5-10',
    price: 1500,
    rating: 4.9,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'trending',
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: '24',
    title: '3BHK in Ahmedabad',
    location: 'C.G. Road, Ahmedabad',
    distance: 90,
    availableDates: 'Sep 20-25',
    price: 1800,
    rating: 4.7,
    images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'],
    category: 'trending',
    coordinates: { lat: 23.0225, lng: 72.5714 }
  }
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchProperties = async (filters: FilterOptions = {}): Promise<Property[]> => {
  try {
    // Try to fetch from backend API first
    const apiProperties = await fetchPropertiesFromAPI(filters);
    if (apiProperties && apiProperties.length > 0) {
      return apiProperties;
    }
  } catch (error) {
    // Silently fallback to local data
  }

  // Fallback to local mock data
  await delay(500); // Simulate API call

  let filteredProperties = [...mockProperties];

  if (filters.category) {
    filteredProperties = filteredProperties.filter(property =>
      property.category === filters.category
    );
  }

  if (filters.location) {
    filteredProperties = filteredProperties.filter(property =>
      property.location.toLowerCase().includes(filters.location!.toLowerCase())
    );
  }

  if (filters.guests) {
    const totalGuests = filters.guests.adults + filters.guests.children;
    // For demo, just return all properties regardless of guest count
    // In real app, you'd filter by capacity
  }

  if (filters.priceRange) {
    filteredProperties = filteredProperties.filter(property =>
      property.price >= filters.priceRange!.min && property.price <= filters.priceRange!.max
    );
  }

  return filteredProperties;
};

export const fetchPropertyById = async (id: string): Promise<Property | null> => {
  try {
    // Try to fetch from backend API first
    const apiProperty = await fetchPropertyByIdFromAPI(id);
    if (apiProperty) {
      return apiProperty;
    }
  } catch (error) {
    // Silently fallback to local data
  }

  // Fallback to local mock data
  await delay(300); // Simulate API call
  
  const property = mockProperties.find(p => p.id === id);
  return property || null;
};