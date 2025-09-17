# 🏠 Airbnb Clone - Full Stack Application

A modern, responsive Airbnb clone built with React, TypeScript, and Node.js. This project features a complete property listing platform with search, filtering, and interactive map functionality.

## 🌟 Features

### Frontend Features
- **🎨 Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **🔍 Advanced Search**: Location-based search with filters
- **🗺️ Interactive Maps**: Property locations with Google Maps integration
- **📱 Mobile Responsive**: Optimized for all device sizes
- **🌐 Multi-language Support**: English and Bengali localization
- **💰 Price Filtering**: Dynamic price range filtering
- **🏷️ Category Filtering**: Filter by property types (apartments, houses, etc.)
- **⭐ Rating System**: Property ratings and reviews
- **🔄 Real-time Updates**: Dynamic property loading and updates

### Backend Features
- **🚀 RESTful API**: Complete property management API
- **🔍 Advanced Search**: Full-text search across properties
- **📊 Pagination**: Efficient data loading with pagination
- **🏷️ Category Management**: Dynamic category filtering
- **📍 Location-based Search**: Geographic property filtering
- **🔒 CORS Enabled**: Cross-origin resource sharing configured
- **📈 Health Monitoring**: API health check endpoints
- **🧪 Comprehensive Testing**: Full test coverage

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management
- **Google Maps API** - Interactive maps

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Deployment
- **Frontend**: Vercel
- **Backend**: Render
- **Database**: JSON file-based (easily extensible to MongoDB/PostgreSQL)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Frontend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yaswanthsai257/Airbnb-frontend.git
   cd Airbnb-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **API will be available at**
   ```
   http://localhost:3001
   ```

## 📁 Project Structure

```
Airbnb-frontend/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── PropertyCard.tsx # Property display card
│   ├── PropertyListings.tsx # Property grid
│   ├── Map.tsx          # Interactive map
│   └── ...
├── services/            # API services
│   ├── propertyService.ts
│   └── backendPropertyService.ts
├── hooks/               # Custom React hooks
├── context/             # React context providers
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── backend/             # Backend API server
    ├── server.js        # Main server file
    ├── data/            # JSON data files
    └── routes/          # API routes
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://airbnb-backend-sb49.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Backend Configuration

The backend automatically configures CORS for:
- `http://localhost:5173` (Vite dev server)
- `https://airbnb-frontend-phi-ten.vercel.app` (Production)

## 📱 API Endpoints

### Properties
- `GET /api/properties` - Get all properties with filtering
- `GET /api/properties/:id` - Get property by ID
- `GET /api/properties/search?q=term` - Search properties
- `GET /api/properties/category/:category` - Get by category
- `GET /api/properties/location/:location` - Get by location

### Categories
- `GET /api/categories` - Get all categories

### Health
- `GET /api/health` - API health check

## 🎨 Key Components

### Header Component
- Responsive navigation
- Search functionality
- Language toggle
- Mobile-optimized design

### PropertyCard Component
- Property image display
- Rating system
- Price information
- Interactive hover effects

### Map Component
- Google Maps integration
- Property markers
- Interactive zoom/pan
- Responsive design

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

### Backend (Render)
1. Connect your GitHub repository to Render
2. Configure service:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Set environment variables if needed

## 🧪 Testing

### Frontend Tests
```bash
npm run test
```

### Backend Tests
```bash
cd backend
npm test
```

## 📊 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized property images
- **Code Splitting**: Reduced bundle size
- **Caching**: API response caching
- **Pagination**: Efficient data loading

## 🔒 Security Features

- **CORS Configuration**: Secure cross-origin requests
- **Helmet.js**: Security headers
- **Input Validation**: API input sanitization
- **Error Handling**: Comprehensive error management

## 🌍 Internationalization

- **English**: Default language
- **Bengali**: Full Bengali translation support
- **Easy Extension**: Add more languages easily

## 📈 Future Enhancements

- [ ] User authentication and authorization
- [ ] Property booking system
- [ ] Payment integration
- [ ] Real-time chat
- [ ] Advanced filtering options
- [ ] Property management dashboard
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Yaswanth Sai**
- GitHub: [@yaswanthsai257](https://github.com/yaswanthsai257)
- Project Link: [https://github.com/yaswanthsai257/Airbnb-frontend](https://github.com/yaswanthsai257/Airbnb-frontend)

## 🙏 Acknowledgments

- Airbnb for design inspiration
- React and TypeScript communities
- Tailwind CSS for the amazing utility framework
- Google Maps API for mapping functionality

## 📞 Support

If you have any questions or need help, please:
1. Check the [Issues](https://github.com/yaswanthsai257/Airbnb-frontend/issues) page
2. Create a new issue if your problem isn't already reported
3. Contact the maintainer

---

⭐ **Star this repository if you found it helpful!**
