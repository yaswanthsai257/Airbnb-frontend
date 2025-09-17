# Airbnb Clone - Frontend & Backend Architecture Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Frontend Architecture](#frontend-architecture)
3. [Backend Architecture](#backend-architecture)
4. [Key Components & Logic](#key-components--logic)
5. [Data Flow](#data-flow)
6. [API Integration](#api-integration)
7. [Features & Functionality](#features--functionality)
8. [Technical Stack](#technical-stack)

---

## 🎯 Project Overview

This is a full-stack Airbnb clone application with:
- **Frontend**: React + TypeScript + Tailwind CSS
- **Backend**: Node.js + Express API
- **Features**: Property listings, search, filtering, maps, responsive design
- **Deployment**: Frontend on Netlify, Backend on Render

---

## 🖥️ Frontend Architecture

### **Project Structure**
```
frontend/
├── components/          # React components
├── services/           # API services & data management
├── hooks/              # Custom React hooks
├── context/            # React context providers
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── public/             # Static assets
```

### **Core Technologies**
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing

---

## 🔧 Backend Architecture

### **API Endpoints**
```
Base URL: https://airbnb-backend-sb49.onrender.com/api

GET  /health                    # Health check
GET  /properties                # Get all properties
GET  /properties/:id            # Get property by ID
GET  /properties/category/:cat  # Get properties by category
GET  /properties/location/:loc  # Get properties by location
GET  /properties/search?q=      # Search properties
GET  /categories                # Get all categories
```

### **Data Structure**
```typescript
interface Property {
  id: string;
  title: string;
  location: string;
  distance: number;
  availableDates: string;
  price: number;
  rating: number;
  images: string[];
  category: string;
  coordinates: { lat: number; lng: number };
  description: string;
  amenities: string[];
  host: {
    name: string;
    avatar: string;
    rating: number;
  };
}
```

---

## 🧩 Key Components & Logic

### **1. App.tsx - Main Application Component**
```typescript
// Main entry point with routing
const App = () => {
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
```

**Logic**: Sets up React Router for navigation between home page and property detail pages.

### **2. HomePage Component**
```typescript
const HomePage = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [showMap, setShowMap] = useState(false);

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
};
```

**Logic**: 
- Manages application state (properties, loading, filters, map visibility)
- Fetches properties based on current filters
- Handles loading states and error handling

### **3. PropertyCard Component**
```typescript
const PropertyCard = ({ property, isMobile = false }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    setImageLoading(true);
    setImageError(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };
};
```

**Logic**:
- Displays individual property information
- Handles image carousel navigation
- Manages image loading states and error handling
- Implements like/favorite functionality
- Responsive design for mobile/desktop

### **4. Header Component**
```typescript
const Header = ({ onFilterChange, showMap, onToggleMap, filters }) => {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleSearch = (searchData) => {
    onFilterChange({
      location: searchData.location,
      guests: searchData.guests,
      priceRange: searchData.priceRange
    });
    setIsSearchModalOpen(false);
  };
};
```

**Logic**:
- Manages search modal state
- Handles user authentication UI
- Implements responsive navigation
- Processes search filters and passes to parent

### **5. MapView Component**
```typescript
const MapView = ({ properties, isLoading, showMap, onPropertySelect }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
    onPropertySelect?.(property);
  };

  const getLayoutClasses = () => {
    if (!showMap) return '';
    if (isMobile) return 'flex flex-col';
    if (isTablet) return 'flex flex-col lg:flex-row';
    return 'flex flex-row';
  };
};
```

**Logic**:
- Manages responsive layout for map and property list
- Handles property selection on map
- Implements responsive design patterns
- Coordinates between map and property list views

---

## 🏗️ System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React)                        │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Header    │  │  Property   │  │    Map      │            │
│  │ Component   │  │   Cards     │  │ Component   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│         │                 │                 │                 │
│         ▼                 ▼                 ▼                 │
│  ┌─────────────────────────────────────────────────────────────┤
│  │              PropertyService & API Layer                    │
│  │  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  │  Local Data     │  │  Backend API    │                  │
│  │  │  (Fallback)     │  │  (Primary)      │                  │
│  │  └─────────────────┘  └─────────────────┘                  │
│  └─────────────────────────────────────────────────────────────┤
└─────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                        BACKEND (Node.js)                       │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐            │
│  │   Express   │  │   Routes    │  │   Data      │            │
│  │   Server    │  │   Handler   │  │   Storage   │            │
│  └─────────────┘  └─────────────┘  └─────────────┘            │
│         │                 │                 │                 │
│         ▼                 ▼                 ▼                 │
│  ┌─────────────────────────────────────────────────────────────┤
│  │              API Endpoints                                 │
│  │  • GET /properties        • GET /categories               │
│  │  • GET /properties/:id    • GET /properties/search        │
│  │  • GET /health            • GET /properties/category/:cat  │
│  └─────────────────────────────────────────────────────────────┤
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Data Flow

### **1. Property Data Flow**
```
Backend API → PropertyService → HomePage → PropertyListings → PropertyCard
     ↓              ↓              ↓            ↓              ↓
  JSON Data → Process & Filter → State → Grid Layout → Individual Cards
```

### **2. Search & Filter Flow**
```
User Input → Header → SearchModal → FilterOptions → PropertyService → API
     ↓           ↓         ↓            ↓              ↓           ↓
  Search → Process → Validate → Update State → Fetch Data → Display Results
```

### **3. Map Integration Flow**
```
Properties → MapView → Map Component → Leaflet → Property Markers
     ↓           ↓          ↓           ↓           ↓
  Coordinates → Render → Initialize → Display → Interactive Markers
```

---

## 🌐 API Integration

### **PropertyService.ts**
```typescript
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
  
  // Apply filters
  if (filters.category) {
    filteredProperties = filteredProperties.filter(property =>
      property.category === filters.category
    );
  }
  
  return filteredProperties;
};
```

**Logic**:
- **Primary**: Fetches data from backend API
- **Fallback**: Uses local mock data if API fails
- **Filtering**: Applies category, location, price, and rating filters
- **Error Handling**: Graceful degradation to local data

### **BackendPropertyService.ts**
```typescript
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

    const url = `${API_BASE_URL}/properties${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result: ApiResponse<Property[]> = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching properties from API:', error);
    return fetchProperties(filters); // Fallback to local data
  }
};
```

**Logic**:
- **Query Building**: Constructs API query parameters from filters
- **HTTP Requests**: Makes fetch requests to backend API
- **Response Handling**: Processes API responses and handles errors
- **Fallback Strategy**: Falls back to local data on API failure

---

## ✨ Features & Functionality

### **1. Property Search & Filtering**
- **Location Search**: Search by city, area, or landmark
- **Date Selection**: Available dates for booking
- **Guest Count**: Adults and children selection
- **Price Range**: Min/max price filtering
- **Category Filter**: Amazing views, chef's kitchens, beachfront, etc.
- **Rating Filter**: Minimum rating requirement

### **2. Interactive Map**
- **Leaflet Integration**: Open-source mapping library
- **Property Markers**: Clickable markers for each property
- **Map Toggle**: Show/hide map view
- **Responsive Design**: Different layouts for mobile/tablet/desktop
- **Property Selection**: Click markers to view property details

### **3. Property Cards**
- **Image Carousel**: Multiple images per property
- **Navigation Controls**: Previous/next image buttons
- **Loading States**: Skeleton loading and error handling
- **Like Functionality**: Save favorite properties
- **Responsive Design**: Different layouts for different screen sizes

### **4. Property Details**
- **Full Property Information**: Description, amenities, host details
- **Image Gallery**: Full-screen image viewing
- **Booking Interface**: Date selection and booking flow
- **Host Information**: Host profile and rating
- **Location Details**: Address and nearby attractions

### **5. Responsive Design**
- **Mobile First**: Optimized for mobile devices
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Flexible Layouts**: Grid systems that adapt to screen size
- **Touch Friendly**: Large touch targets for mobile

---

## 🛠️ Technical Stack

### **Frontend Technologies**
```json
{
  "react": "^18.2.0",
  "typescript": "^5.0.0",
  "tailwindcss": "^3.4.0",
  "vite": "^6.3.6",
  "react-router-dom": "^6.8.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

### **Backend Technologies**
```json
{
  "express": "^4.18.0",
  "cors": "^2.8.5",
  "helmet": "^7.0.0",
  "morgan": "^1.10.0",
  "dotenv": "^16.0.0"
}
```

### **Development Tools**
- **Vite**: Fast development server and build tool
- **TypeScript**: Type safety and better development experience
- **Tailwind CSS**: Utility-first CSS framework
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting

---

## 🚀 Deployment Architecture

### **Frontend Deployment (Netlify)**
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
- **Environment**: Production optimized build
- **CDN**: Global content delivery network

### **Backend Deployment (Render)**
- **Runtime**: Node.js
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Environment**: Production with environment variables
- **Database**: JSON file-based data storage

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

### **4. Accessibility**
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader**: Proper ARIA labels and semantic HTML
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus indicators

---

## 🔧 Configuration Files

### **Vite Configuration (vite.config.ts)**
```typescript
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});
```

### **Tailwind Configuration (tailwind.config.js)**
```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'airbnb-red': '#FF385C',
        'airbnb-dark': '#222222'
      }
    },
  },
  plugins: [],
}
```

### **TypeScript Configuration (tsconfig.json)**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

---

## 📊 Data Management

### **State Management**
- **React Hooks**: useState, useEffect, useCallback for local state
- **Context API**: LocalizationContext for global state
- **Custom Hooks**: useLocalization for translation management

### **Data Flow Patterns**
- **Props Drilling**: Data passed down through component hierarchy
- **Callback Props**: Functions passed up to parent components
- **Context Providers**: Global state management for translations

### **API Data Handling**
- **Fetch API**: Modern HTTP client for API calls
- **Error Boundaries**: React error boundaries for error handling
- **Loading States**: Comprehensive loading state management
- **Caching**: Browser caching and local storage

---

This documentation provides a comprehensive overview of the Airbnb clone application's architecture, components, and functionality. Use this as a reference for your demo video to explain the technical aspects clearly and professionally.
