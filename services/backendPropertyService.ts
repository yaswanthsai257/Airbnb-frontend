import type { Property, FilterOptions } from '../types';

const API_BASE_URL = 'https://airbnb-backend-sb49.onrender.com/api';

// API Response interfaces
interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
  filters?: {
    category?: string;
    location?: string;
    minPrice?: string;
    maxPrice?: string;
    minRating?: string;
  };
}

interface PropertyResponse {
  success: boolean;
  data: Property;
}

// Fetch properties from backend API
export const fetchPropertiesFromAPI = async (filters: FilterOptions = {}, searchQuery?: string): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    if (filters.location) {
      queryParams.append('location', filters.location);
    }
    
    if (filters.priceRange) {
      if (filters.priceRange.min) {
        queryParams.append('minPrice', filters.priceRange.min.toString());
      }
      if (filters.priceRange.max) {
        queryParams.append('maxPrice', filters.priceRange.max.toString());
      }
    }

    // Add search query if provided
    if (searchQuery) {
      queryParams.append('search', searchQuery);
    }

    const url = `${API_BASE_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching properties from API:', error);
    // Fallback to local data if API fails
    return fetchProperties(filters);
  }
};

// Fetch single property by ID from backend API
export const fetchPropertyByIdFromAPI = async (id: string): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: PropertyResponse = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching property from API:', error);
    // Fallback to local data if API fails
    return fetchPropertyById(id);
  }
};

// Search properties using backend API
export const searchPropertiesFromAPI = async (query: string): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error searching properties from API:', error);
    // Fallback to local search
    const allProperties = await fetchProperties();
    return allProperties.filter(property =>
      property.title.toLowerCase().includes(query.toLowerCase()) ||
      property.location.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Get properties by category from backend API
export const fetchPropertiesByCategoryFromAPI = async (category: string): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/category/${encodeURIComponent(category)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching properties by category from API:', error);
    // Fallback to local data
    const allProperties = await fetchProperties();
    return allProperties.filter(property => property.category === category);
  }
};

// Get properties by location from backend API
export const fetchPropertiesByLocationFromAPI = async (location: string): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/location/${encodeURIComponent(location)}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching properties by location from API:', error);
    // Fallback to local data
    const allProperties = await fetchProperties();
    return allProperties.filter(property =>
      property.location.toLowerCase().includes(location.toLowerCase())
    );
  }
};

// Get all categories from backend API
export const fetchCategoriesFromAPI = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<string[]> = await response.json();
    
    if (!result.success) {
      throw new Error('API returned error');
    }
    
    return result.data;
  } catch (error) {
    console.error('Error fetching categories from API:', error);
    // Fallback to local categories
    return ['amazing_views', 'chefs_kitchens', 'beachfront', 'mansions', 'tiny_homes', 'treehouses', 'countryside', 'trending'];
  }
};

// Health check for backend API
export const checkAPIHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('API health check failed:', error);
    return false;
  }
};

// Import the local fallback functions
import { fetchProperties, fetchPropertyById } from './propertyService';
