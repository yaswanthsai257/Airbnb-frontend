
import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import MapView from './components/MapView';
import PropertyDetail from './components/PropertyDetail';
import Footer from './components/Footer';
import { Property, FilterOptions } from './types';
import { fetchProperties } from './services/propertyService';
import { CATEGORIES } from './constants';

const HomePage: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showMap, setShowMap] = useState(false);

  const handleFilterChange = useCallback((newFilters: Partial<FilterOptions>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  }, []);

  const handleToggleMap = useCallback(() => {
    setShowMap(prev => !prev);
  }, []);

  const loadProperties = useCallback(async () => {
    setIsLoading(true);
    console.log('Loading properties with filters:', filters);
    try {
      const fetchedProperties = await fetchProperties(filters);
      console.log('Fetched properties:', fetchedProperties);
      setProperties(fetchedProperties);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadProperties();
  }, [loadProperties]);

  return (
    <>
      <Header 
        onFilterChange={handleFilterChange} 
        showMap={showMap}
        onToggleMap={handleToggleMap}
        filters={filters}
      />
      <main className="flex-grow container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40">
        <MapView 
          properties={properties} 
          isLoading={isLoading}
          showMap={showMap}
          onPropertySelect={(property) => {
            // Navigate to property detail page
            window.location.href = `/property/${property.id}`;
          }}
        />
      </main>
      <Footer />
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
