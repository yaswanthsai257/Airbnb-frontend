#!/bin/bash

# Docker management scripts for Airbnb Clone

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Build and run production containers
build_production() {
    print_status "Building production containers..."
    docker-compose build
    print_success "Production containers built successfully!"
}

# Start production containers
start_production() {
    print_status "Starting production containers..."
    docker-compose up -d
    print_success "Production containers started!"
    print_status "Frontend: http://localhost:80"
    print_status "Backend API: http://localhost:3001"
}

# Stop production containers
stop_production() {
    print_status "Stopping production containers..."
    docker-compose down
    print_success "Production containers stopped!"
}

# Build and run development containers
build_development() {
    print_status "Building development containers..."
    docker-compose -f docker-compose.dev.yml build
    print_success "Development containers built successfully!"
}

# Start development containers
start_development() {
    print_status "Starting development containers..."
    docker-compose -f docker-compose.dev.yml up -d
    print_success "Development containers started!"
    print_status "Frontend: http://localhost:5173"
    print_status "Backend API: http://localhost:3001"
}

# Stop development containers
stop_development() {
    print_status "Stopping development containers..."
    docker-compose -f docker-compose.dev.yml down
    print_success "Development containers stopped!"
}

# View logs
view_logs() {
    if [ "$1" = "dev" ]; then
        docker-compose -f docker-compose.dev.yml logs -f
    else
        docker-compose logs -f
    fi
}

# Clean up containers and images
cleanup() {
    print_warning "This will remove all containers, images, and volumes. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
        print_status "Cleaning up Docker resources..."
        docker-compose down --volumes --remove-orphans
        docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
        docker system prune -af
        print_success "Cleanup completed!"
    else
        print_status "Cleanup cancelled."
    fi
}

# Show container status
status() {
    print_status "Container Status:"
    echo ""
    echo "Production containers:"
    docker-compose ps
    echo ""
    echo "Development containers:"
    docker-compose -f docker-compose.dev.yml ps
}

# Show help
show_help() {
    echo "Airbnb Clone Docker Management Script"
    echo ""
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build-prod     Build production containers"
    echo "  start-prod     Start production containers"
    echo "  stop-prod      Stop production containers"
    echo "  build-dev      Build development containers"
    echo "  start-dev      Start development containers"
    echo "  stop-dev       Stop development containers"
    echo "  logs [dev]     View logs (add 'dev' for development)"
    echo "  status         Show container status"
    echo "  cleanup        Remove all containers and images"
    echo "  help           Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 start-prod    # Start production environment"
    echo "  $0 start-dev     # Start development environment"
    echo "  $0 logs dev      # View development logs"
}

# Main script logic
case "$1" in
    "build-prod")
        build_production
        ;;
    "start-prod")
        start_production
        ;;
    "stop-prod")
        stop_production
        ;;
    "build-dev")
        build_development
        ;;
    "start-dev")
        start_development
        ;;
    "stop-dev")
        stop_development
        ;;
    "logs")
        view_logs "$2"
        ;;
    "status")
        status
        ;;
    "cleanup")
        cleanup
        ;;
    "help"|"--help"|"-h"|"")
        show_help
        ;;
    *)
        print_error "Unknown command: $1"
        show_help
        exit 1
        ;;
esac
