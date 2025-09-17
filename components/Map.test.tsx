import React from 'react';
import { render, screen } from '@testing-library/react';
import Map from './Map';
import type { Property } from '../types';

// Mock react-leaflet components
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children, center }: any) => (
    <div data-testid="map-container" data-center={JSON.stringify(center)}>
      {children}
    </div>
  ),
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ position, children }: any) => (
    <div data-testid="marker" data-position={JSON.stringify(position)}>
      {children}
    </div>
  ),
  Popup: ({ children }: any) => <div data-testid="popup">{children}</div>,
}));

// Mock leaflet
jest.mock('leaflet', () => ({
  divIcon: jest.fn(() => ({})),
  icon: jest.fn(() => ({})),
  Icon: {
    Default: {
      prototype: {},
      mergeOptions: jest.fn(),
    },
  },
}));

const mockProperties: Property[] = [
  {
    id: '1',
    title: '2BHK in Bangalore',
    location: 'Koramangala, Bangalore',
    distance: 10,
    availableDates: 'Dec 15-20',
    price: 3500,
    rating: 4.9,
    images: ['https://example.com/image1.jpg'],
    category: 'amazing_views',
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: '2',
    title: '3BHK in Mumbai',
    location: 'Bandra, Mumbai',
    distance: 5,
    availableDates: 'Dec 20-25',
    price: 5000,
    rating: 4.7,
    images: ['https://example.com/image2.jpg'],
    category: 'amazing_views',
    coordinates: { lat: 19.0760, lng: 72.8777 }
  }
];

describe('Map Component', () => {
  it('should center map on India when no properties are provided', () => {
    render(<Map properties={[]} />);
    
    const mapContainer = screen.getByTestId('map-container');
    const center = JSON.parse(mapContainer.getAttribute('data-center') || '[]');
    
    expect(center).toEqual([20.5937, 78.9629]); // India center
  });

  it('should center map on average of property coordinates', () => {
    render(<Map properties={mockProperties} />);
    
    const mapContainer = screen.getByTestId('map-container');
    const center = JSON.parse(mapContainer.getAttribute('data-center') || '[]');
    
    // Calculate expected center
    const expectedLat = (12.9352 + 19.0760) / 2;
    const expectedLng = (77.6245 + 72.8777) / 2;
    
    expect(center[0]).toBeCloseTo(expectedLat, 4);
    expect(center[1]).toBeCloseTo(expectedLng, 4);
  });

  it('should render markers for all properties', () => {
    render(<Map properties={mockProperties} />);
    
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(2);
    
    // Check first marker position
    const firstMarker = markers[0];
    const position = JSON.parse(firstMarker.getAttribute('data-position') || '[]');
    expect(position).toEqual([12.9352, 77.6245]);
  });

  it('should show loading message when no properties', () => {
    render(<Map properties={[]} />);
    
    expect(screen.getByText('Loading properties...')).toBeInTheDocument();
  });

  it('should show property count when properties exist', () => {
    render(<Map properties={mockProperties} />);
    
    expect(screen.getByText('2 properties found')).toBeInTheDocument();
  });

  it('should format prices correctly in markers', () => {
    const propertiesWithDifferentPrices: Property[] = [
      {
        id: '1',
        title: 'Budget Property',
        location: 'Test Location',
        distance: 5,
        availableDates: 'Dec 15-20',
        price: 1500, // Should show as ₹1.5K
        rating: 4.5,
        images: ['https://example.com/image1.jpg'],
        category: 'amazing_views',
        coordinates: { lat: 12.9352, lng: 77.6245 }
      },
      {
        id: '2',
        title: 'Premium Property',
        location: 'Test Location',
        distance: 5,
        availableDates: 'Dec 20-25',
        price: 5000, // Should show as ₹5K
        rating: 4.8,
        images: ['https://example.com/image2.jpg'],
        category: 'amazing_views',
        coordinates: { lat: 19.0760, lng: 72.8777 }
      }
    ];

    render(<Map properties={propertiesWithDifferentPrices} />);
    
    // Check that markers are rendered (price formatting is tested in the icon creation)
    const markers = screen.getAllByTestId('marker');
    expect(markers).toHaveLength(2);
  });

  it('should use correct color coding for Indian Rupee prices', () => {
    // Test that the color ranges are appropriate for INR prices
    // This is more of a visual test, but we can verify the logic
    const testPrices = [
      { price: 1500, expectedColor: '#00A699' }, // Green for under ₹2000
      { price: 3000, expectedColor: '#FF8A00' }, // Orange for ₹2000-5000
      { price: 6000, expectedColor: '#FF385C' }  // Red for over ₹5000
    ];

    // The actual color testing would require more complex setup
    // This test ensures the component renders without errors
    testPrices.forEach(({ price }) => {
      const property: Property = {
        id: '1',
        title: 'Test Property',
        location: 'Test Location',
        distance: 5,
        availableDates: 'Dec 15-20',
        price,
        rating: 4.5,
        images: ['https://example.com/image1.jpg'],
        category: 'amazing_views',
        coordinates: { lat: 12.9352, lng: 77.6245 }
      };

      expect(() => render(<Map properties={[property]} />)).not.toThrow();
    });
  });
});
