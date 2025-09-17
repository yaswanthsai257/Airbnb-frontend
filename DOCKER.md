# 🐳 Docker Setup for Airbnb Clone

This guide explains how to run the Airbnb Clone application using Docker containers.

## 📋 Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)

## 🚀 Quick Start

### Production Environment

```bash
# Build and start production containers
docker-compose up --build -d

# View logs
docker-compose logs -f

# Stop containers
docker-compose down
```

### Development Environment

```bash
# Build and start development containers
docker-compose -f docker-compose.dev.yml up --build -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop containers
docker-compose -f docker-compose.dev.yml down
```

## 🛠️ Using Docker Scripts

We've provided a convenient script to manage Docker containers:

```bash
# Make script executable (Linux/Mac)
chmod +x docker-scripts.sh

# Start production environment
./docker-scripts.sh start-prod

# Start development environment
./docker-scripts.sh start-dev

# View logs
./docker-scripts.sh logs

# Check container status
./docker-scripts.sh status

# Clean up everything
./docker-scripts.sh cleanup
```

## 📁 Project Structure

```
airbnb-clone/
├── Dockerfile                 # Frontend production build
├── Dockerfile.dev            # Frontend development
├── docker-compose.yml        # Production environment
├── docker-compose.dev.yml    # Development environment
├── nginx.conf               # Nginx configuration
├── docker-scripts.sh        # Management scripts
├── backend/
│   ├── Dockerfile           # Backend production
│   ├── Dockerfile.dev       # Backend development
│   └── .dockerignore        # Backend ignore file
└── .dockerignore            # Frontend ignore file
```

## 🌐 Access Points

### Production
- **Frontend**: http://localhost:80
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

### Development
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **API Health**: http://localhost:3001/api/health

## 🔧 Configuration

### Environment Variables

#### Backend
- `NODE_ENV`: Environment (production/development)
- `PORT`: Server port (default: 3001)

#### Frontend
- `VITE_API_URL`: Backend API URL (development only)

### Volumes

- **Backend Data**: `./backend/data:/app/data:ro` (read-only)
- **Development**: Source code is mounted for hot reloading

## 🏥 Health Checks

Both containers include health checks:

- **Backend**: Checks `/api/health` endpoint
- **Frontend**: Checks nginx health endpoint

## 📊 Monitoring

### View Container Status
```bash
docker-compose ps
```

### View Resource Usage
```bash
docker stats
```

### View Logs
```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 🧪 Testing in Docker

### Run Tests in Backend Container
```bash
# Production container
docker-compose exec backend npm test

# Development container
docker-compose -f docker-compose.dev.yml exec backend-dev npm test
```

### Run Tests with Coverage
```bash
docker-compose exec backend npm run test:coverage
```

## 🚀 Deployment

### Build for Production
```bash
# Build images
docker-compose build

# Tag for registry
docker tag airbnb-clone_frontend your-registry/airbnb-frontend:latest
docker tag airbnb-clone_backend your-registry/airbnb-backend:latest

# Push to registry
docker push your-registry/airbnb-frontend:latest
docker push your-registry/airbnb-backend:latest
```

### Deploy to Production Server
```bash
# Pull images
docker pull your-registry/airbnb-frontend:latest
docker pull your-registry/airbnb-backend:latest

# Start services
docker-compose up -d
```

## 🔒 Security Features

- **Non-root user**: Backend runs as non-root user
- **Read-only volumes**: Data directory is read-only
- **Security headers**: Nginx includes security headers
- **Health checks**: Container health monitoring
- **Resource limits**: Configurable in docker-compose.yml

## 🐛 Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Check what's using the port
netstat -tulpn | grep :80
netstat -tulpn | grep :3001

# Stop conflicting services or change ports in docker-compose.yml
```

#### Container Won't Start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Check container status
docker-compose ps
```

#### Permission Issues
```bash
# Fix file permissions
sudo chown -R $USER:$USER .

# Rebuild containers
docker-compose build --no-cache
```

### Clean Up

#### Remove All Containers and Images
```bash
./docker-scripts.sh cleanup
```

#### Remove Only Stopped Containers
```bash
docker container prune
```

#### Remove Unused Images
```bash
docker image prune
```

## 📈 Performance Optimization

### Multi-stage Builds
- Frontend uses multi-stage build for smaller production image
- Backend uses Alpine Linux for minimal footprint

### Caching
- Nginx configured for static asset caching
- Docker layer caching for faster builds

### Resource Limits
Add to docker-compose.yml:
```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          memory: 512M
        reservations:
          memory: 256M
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker images
        run: docker-compose build
      - name: Run tests
        run: docker-compose run --rm backend npm test
      - name: Deploy
        run: docker-compose up -d
```

## 📚 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Node.js Docker Best Practices](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)
