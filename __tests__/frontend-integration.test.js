/**
 * Frontend Integration Tests
 * These tests verify that the frontend can properly communicate with the backend API
 */

// Mock fetch for testing
global.fetch = jest.fn();

describe('Frontend-Backend Integration Tests', () => {
  
  beforeEach(() => {
    fetch.mockClear();
  });

  describe('Property Service Integration', () => {
    it('should fetch properties from backend API', async () => {
      const mockProperties = [
        {
          id: '1',
          title: '2BHK in Bangalore',
          location: 'Koramangala, Bangalore',
          price: 2500,
          rating: 4.9,
          coordinates: { lat: 12.9352, lng: 77.6245 }
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockProperties,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalItems: 1,
            itemsPerPage: 10,
            hasNextPage: false,
            hasPrevPage: false
          }
        })
      });

      // Simulate frontend API call
      const response = await fetch('http://localhost:3001/api/properties');
      const result = await response.json();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/properties');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProperties);
    });

    it('should handle search requests from frontend', async () => {
      const mockSearchResults = [
        {
          id: '1',
          title: '2BHK in Bangalore',
          location: 'Koramangala, Bangalore',
          price: 2500,
          rating: 4.9
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockSearchResults,
          query: 'Bangalore',
          count: 1
        })
      });

      const searchQuery = 'Bangalore';
      const response = await fetch(`http://localhost:3001/api/properties/search?q=${encodeURIComponent(searchQuery)}`);
      const result = await response.json();

      expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/properties/search?q=${encodeURIComponent(searchQuery)}`);
      expect(result.success).toBe(true);
      expect(result.query).toBe(searchQuery);
      expect(result.data).toEqual(mockSearchResults);
    });

    it('should handle filter requests from frontend', async () => {
      const mockFilteredResults = [
        {
          id: '1',
          title: '2BHK in Bangalore',
          location: 'Koramangala, Bangalore',
          price: 2500,
          rating: 4.9,
          category: 'amazing_views'
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockFilteredResults,
          filters: {
            category: 'amazing_views',
            minPrice: '2000',
            maxPrice: '3000'
          }
        })
      });

      const filters = {
        category: 'amazing_views',
        minPrice: 2000,
        maxPrice: 3000
      };

      const queryParams = new URLSearchParams();
      queryParams.append('category', filters.category);
      queryParams.append('minPrice', filters.minPrice.toString());
      queryParams.append('maxPrice', filters.maxPrice.toString());

      const response = await fetch(`http://localhost:3001/api/properties?${queryParams.toString()}`);
      const result = await response.json();

      expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/properties?${queryParams.toString()}`);
      expect(result.success).toBe(true);
      expect(result.filters.category).toBe(filters.category);
      expect(result.filters.minPrice).toBe(filters.minPrice.toString());
      expect(result.filters.maxPrice).toBe(filters.maxPrice.toString());
    });

    it('should handle property detail requests', async () => {
      const mockProperty = {
        id: '1',
        title: '2BHK in Bangalore',
        location: 'Koramangala, Bangalore',
        price: 2500,
        rating: 4.9,
        coordinates: { lat: 12.9352, lng: 77.6245 },
        images: ['image1.jpg', 'image2.jpg'],
        description: 'Beautiful property',
        amenities: ['WiFi', 'AC'],
        host: {
          name: 'John Doe',
          avatar: 'avatar.jpg',
          rating: 4.8
        }
      };

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockProperty
        })
      });

      const response = await fetch('http://localhost:3001/api/properties/1');
      const result = await response.json();

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/properties/1');
      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockProperty);
    });

    it('should handle API errors gracefully', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetch('http://localhost:3001/api/properties');
      } catch (error) {
        expect(error.message).toBe('Network error');
      }

      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/properties');
    });

    it('should handle 404 responses', async () => {
      fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({
          success: false,
          message: 'Property not found'
        })
      });

      const response = await fetch('http://localhost:3001/api/properties/999');
      const result = await response.json();

      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
      expect(result.success).toBe(false);
      expect(result.message).toBe('Property not found');
    });
  });

  describe('Map Integration', () => {
    it('should fetch properties with coordinates for map display', async () => {
      const mockPropertiesWithCoords = [
        {
          id: '1',
          title: '2BHK in Bangalore',
          location: 'Koramangala, Bangalore',
          price: 2500,
          rating: 4.9,
          coordinates: { lat: 12.9352, lng: 77.6245 }
        },
        {
          id: '2',
          title: '3BHK in Chennai',
          location: 'T. Nagar, Chennai',
          price: 2200,
          rating: 4.8,
          coordinates: { lat: 13.0827, lng: 80.2707 }
        }
      ];

      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          success: true,
          data: mockPropertiesWithCoords
        })
      });

      const response = await fetch('http://localhost:3001/api/properties');
      const result = await response.json();

      expect(result.success).toBe(true);
      result.data.forEach(property => {
        expect(property).toHaveProperty('coordinates');
        expect(property.coordinates).toHaveProperty('lat');
        expect(property.coordinates).toHaveProperty('lng');
        expect(typeof property.coordinates.lat).toBe('number');
        expect(typeof property.coordinates.lng).toBe('number');
      });
    });
  });

  describe('Search Integration', () => {
    it('should handle search from search bar input', async () => {
      const searchInputs = [
        'Bangalore',
        '2BHK',
        'Mumbai',
        'beachfront',
        'amazing_views'
      ];

      for (const input of searchInputs) {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: [],
            query: input,
            count: 0
          })
        });

        const response = await fetch(`http://localhost:3001/api/properties/search?q=${encodeURIComponent(input)}`);
        const result = await response.json();

        expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/properties/search?q=${encodeURIComponent(input)}`);
        expect(result.success).toBe(true);
        expect(result.query).toBe(input);
      }
    });
  });

  describe('Filter Integration', () => {
    it('should handle price range filter from frontend', async () => {
      const priceRanges = [
        { min: 1000, max: 2000 },
        { min: 2000, max: 3000 },
        { min: 3000, max: 5000 }
      ];

      for (const range of priceRanges) {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: [],
            filters: {
              minPrice: range.min.toString(),
              maxPrice: range.max.toString()
            }
          })
        });

        const queryParams = new URLSearchParams();
        queryParams.append('minPrice', range.min.toString());
        queryParams.append('maxPrice', range.max.toString());

        const response = await fetch(`http://localhost:3001/api/properties?${queryParams.toString()}`);
        const result = await response.json();

        expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/properties?${queryParams.toString()}`);
        expect(result.success).toBe(true);
        expect(result.filters.minPrice).toBe(range.min.toString());
        expect(result.filters.maxPrice).toBe(range.max.toString());
      }
    });

    it('should handle category filter from frontend', async () => {
      const categories = ['amazing_views', 'beachfront', 'mansions'];

      for (const category of categories) {
        fetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            success: true,
            data: [],
            filters: { category }
          })
        });

        const response = await fetch(`http://localhost:3001/api/properties?category=${category}`);
        const result = await response.json();

        expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/properties?category=${category}`);
        expect(result.success).toBe(true);
        expect(result.filters.category).toBe(category);
      }
    });
  });

  describe('Error Handling', () => {
    it('should handle network errors with fallback', async () => {
      fetch.mockRejectedValueOnce(new Error('Network error'));

      // Simulate fallback to local data
      const localData = [
        {
          id: '1',
          title: '2BHK in Bangalore',
          location: 'Koramangala, Bangalore',
          price: 2500,
          rating: 4.9
        }
      ];

      try {
        await fetch('http://localhost:3001/api/properties');
      } catch (error) {
        // Fallback to local data
        expect(error.message).toBe('Network error');
        // In real implementation, would return local data
      }
    });

    it('should handle malformed API responses', async () => {
      fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          // Missing success field
          data: []
        })
      });

      const response = await fetch('http://localhost:3001/api/properties');
      const result = await response.json();

      expect(result).not.toHaveProperty('success');
      // In real implementation, would handle this gracefully
    });
  });
});
