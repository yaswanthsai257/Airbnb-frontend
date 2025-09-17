# 🏠 Airbnb Clone - Frontend Application

A modern, responsive Airbnb clone frontend built with React and TypeScript. This project features a complete property listing platform with search, filtering, and interactive map functionality.

## 🌟 Features

- **🎨 Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **🔍 Advanced Search**: Location-based search with filters
- **🗺️ Interactive Maps**: Property locations with Google Maps integration
- **📱 Mobile Responsive**: Optimized for all device sizes
- **🌐 Multi-language Support**: English and Bengali localization
- **💰 Price Filtering**: Dynamic price range filtering
- **🏷️ Category Filtering**: Filter by property types (apartments, houses, etc.)
- **⭐ Rating System**: Property ratings and reviews
- **🔄 Real-time Updates**: Dynamic property loading and updates
- **🎛️ Backend Toggle**: Switch between local and remote API endpoints

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Context** - State management
- **Google Maps API** - Interactive maps

### Deployment
- **Frontend**: Vercel
- **API**: External backend service (Render)

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git

### Setup

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

### API Configuration

The frontend connects to an external API. You can toggle between different API endpoints using the backend toggle in the application.

## 📁 Project Structure

```
Airbnb-frontend/
├── components/           # React components
│   ├── Header.tsx       # Navigation header
│   ├── PropertyCard.tsx # Property display card
│   ├── PropertyListings.tsx # Property grid
│   ├── Map.tsx          # Interactive map
│   ├── BackendToggle.tsx # API endpoint toggle
│   └── ...
├── services/            # API services
│   ├── propertyService.ts
│   └── categoryService.ts
├── hooks/               # Custom React hooks
├── context/             # React context providers
├── types/               # TypeScript type definitions
├── public/              # Static assets
└── __tests__/           # Frontend tests
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://airbnb-backend-sb49.onrender.com/api
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### API Integration

The frontend connects to an external API service. The BackendToggle component allows switching between different API endpoints for development and production use.

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

### BackendToggle Component
- Switch between API endpoints
- Development and production modes
- Real-time API switching

## 🌐 Deployment

### Frontend (Vercel)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy automatically on push to main branch

## 🧪 Testing

### Frontend Tests
```bash
npm run test
```

## 📊 Performance Features

- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Optimized property images
- **Code Splitting**: Reduced bundle size
- **Caching**: API response caching
- **Pagination**: Efficient data loading

## 🔒 Security Features

- **Input Validation**: Client-side input sanitization
- **Error Handling**: Comprehensive error management
- **Secure API Calls**: Proper error handling for API requests

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
- [ ] Progressive Web App (PWA) features
- [ ] Offline functionality

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
