# Function Reference Guide - Airbnb Clone

## 🎯 Quick Reference for Demo

### **Frontend Functions**

#### **App.tsx**
```typescript
// Main application component with routing
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/property/:id" element={<PropertyDetail />} />
      </Routes>
    </Router>
  );
};
```
**Purpose**: Sets up React Router for navigation between pages

---

#### **HomePage Component**
```typescript
// State management for the main page
const [properties, setProperties] = useState<Property[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [filters, setFilters] = useState<FilterOptions>({});
const [showMap, setShowMap] = useState(false);

// Load properties based on current filters
const loadProperties = useCallback(async () => {
  setIsLoading(true);
  try {
    const fetchedProperties = await fetchProperties(filters);
    setProperties(fetchedProperties);
  } catch (error) {
    console.error("Failed to fetch properties:", error);
  } finally {
    setIsLoading(false);
  }
}, [filters]);
```
**Purpose**: 
- Manages application state (properties, loading, filters, map)
- Fetches and updates property data
- Handles loading states and errors

---

#### **PropertyCard Component**
```typescript
// Image carousel navigation
const nextImage = (e: React.MouseEvent) => {
  e.stopPropagation();
  setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  setImageLoading(true);
  setImageError(false);
};

// Image loading handlers
const handleImageLoad = () => {
  setImageLoading(false);
  setImageError(false);
};

const handleImageError = () => {
  setImageLoading(false);
  setImageError(true);
};
```
**Purpose**:
- Displays individual property information
- Handles image carousel navigation
- Manages image loading states and errors
- Implements like/favorite functionality

---

#### **Header Component**
```typescript
// Search functionality
const handleSearch = (searchData: SearchData) => {
  onFilterChange({
    location: searchData.location,
    guests: searchData.guests,
    priceRange: searchData.priceRange
  });
  setIsSearchModalOpen(false);
};

// Filter change handler
const handleFilterChange = (newFilters: Partial<FilterOptions>) => {
  setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
};
```
**Purpose**:
- Manages search modal state
- Processes search filters
- Handles user authentication UI
- Implements responsive navigation

---

#### **MapView Component**
```typescript
// Property selection on map
const handlePropertySelect = (property: Property) => {
  setSelectedProperty(property);
  onPropertySelect?.(property);
};

// Responsive layout classes
const getLayoutClasses = () => {
  if (!showMap) return '';
  if (isMobile) return 'flex flex-col';
  if (isTablet) return 'flex flex-col lg:flex-row';
  return 'flex flex-row';
};
```
**Purpose**:
- Manages responsive layout for map and property list
- Handles property selection on map
- Implements responsive design patterns
- Coordinates between map and property list views

---

### **Service Functions**

#### **PropertyService.ts**
```typescript
// Main property fetching function
export const fetchProperties = async (filters: FilterOptions = {}): Promise<Property[]> => {
  try {
    // Try API first
    const apiProperties = await fetchPropertiesFromAPI(filters);
    if (apiProperties && apiProperties.length > 0) {
      return apiProperties;
    }
  } catch (error) {
    // Fallback to local data
  }

  // Local data with filtering
  let filteredProperties = [...mockProperties];
  
  if (filters.category) {
    filteredProperties = filteredProperties.filter(property =>
      property.category === filters.category
    );
  }
  
  return filteredProperties;
};
```
**Purpose**:
- Primary data fetching function
- Implements API-first with local fallback
- Applies filters to property data
- Handles errors gracefully

---

#### **BackendPropertyService.ts**
```typescript
// API property fetching
export const fetchPropertiesFromAPI = async (filters: FilterOptions = {}, searchQuery?: string): Promise<Property[]> => {
  try {
    const queryParams = new URLSearchParams();
    
    // Build query parameters
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

    const url = `${API_BASE_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching properties from API:', error);
    return fetchProperties(filters); // Fallback
  }
};
```
**Purpose**:
- Handles API communication
- Builds query parameters from filters
- Processes API responses
- Implements error handling and fallback

---

### **Backend Functions**

#### **API Endpoints**
```javascript
// Get all properties with optional filtering
app.get('/api/properties', (req, res) => {
  const { category, location, minPrice, maxPrice, search } = req.query;
  let filteredProperties = properties;
  
  // Apply filters
  if (category) {
    filteredProperties = filteredProperties.filter(p => p.category === category);
  }
  if (location) {
    filteredProperties = filteredProperties.filter(p => 
      p.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (minPrice) {
    filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
  }
  if (maxPrice) {
    filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice));
  }
  
  res.json({
    success: true,
    data: filteredProperties,
    pagination: {
      currentPage: 1,
      totalPages: 1,
      totalItems: filteredProperties.length,
      itemsPerPage: filteredProperties.length
    }
  });
});
```
**Purpose**:
- Provides RESTful API endpoints
- Handles query parameter filtering
- Returns structured JSON responses
- Implements pagination metadata

---

## 🔄 Data Flow Summary

### **1. User Interaction Flow**
```
User Input → Component → Service → API → Backend → Response → State Update → UI Update
```

### **2. Property Loading Flow**
```
App Load → HomePage → PropertyService → API Call → Data Processing → State Update → Render
```

### **3. Search Flow**
```
Search Input → Header → Filter Update → PropertyService → API Call → Filtered Results → Display
```

### **4. Map Interaction Flow**
```
Map Click → MapView → Property Selection → State Update → Property Highlight → Details Display
```

---

## 🎯 Key Demo Points

### **1. Component Architecture**
- **Modular Design**: Each component has a single responsibility
- **Props & State**: Clear data flow between components
- **Reusability**: Components can be reused across the application

### **2. State Management**
- **Local State**: useState for component-specific data
- **Global State**: Context for shared data (localization)
- **Side Effects**: useEffect for data fetching and updates

### **3. Error Handling**
- **API Errors**: Graceful fallback to local data
- **Image Errors**: Placeholder images for failed loads
- **Loading States**: User feedback during data operations

### **4. Performance**
- **Lazy Loading**: Images load as needed
- **Memoization**: useCallback for function optimization
- **Code Splitting**: Optimized bundle sizes

### **5. Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: Tailwind CSS responsive utilities
- **Flexible Layouts**: Adapts to different screen sizes

---

## 🚀 Deployment Architecture

### **Frontend (Netlify)**
- **Build Process**: Vite creates optimized production bundle
- **Static Hosting**: Serves static files from CDN
- **Environment**: Production-optimized configuration

### **Backend (Render)**
- **API Server**: Express.js server with RESTful endpoints
- **Data Storage**: JSON file-based data (can be upgraded to database)
- **Environment**: Production environment with proper configuration

---

## 📱 User Experience Features

### **1. Loading States**
- **Skeleton Loading**: Placeholder content while data loads
- **Image Loading**: Progressive image loading with error handling
- **API Loading**: Loading indicators for API calls

### **2. Error Handling**
- **API Errors**: Graceful fallback to local data
- **Image Errors**: Placeholder images for failed loads
- **Network Errors**: User-friendly error messages

### **3. Performance Optimizations**
- **Image Optimization**: Responsive images with proper sizing
- **Lazy Loading**: Load images as they come into view
- **Code Splitting**: Split code for faster initial load
- **Caching**: Browser caching for static assets

This reference guide provides quick access to the key functions and their purposes for your demo presentation.
