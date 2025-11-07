#!/bin/bash

# TrustNet Deployment Script
# Comprehensive deployment for TrustNet AI-Powered Phishing Detection Platform

set -e

echo "🚀 TrustNet Deployment Script"
echo "================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
FRONTEND_PORT=3000
BACKEND_PORT=5000
MONGODB_PORT=27017

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check prerequisites
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    # Check Docker (optional)
    if command -v docker &> /dev/null; then
        log_success "Docker found - containerized deployment available"
        DOCKER_AVAILABLE=true
    else
        log_warning "Docker not found - using local deployment only"
        DOCKER_AVAILABLE=false
    fi
    
    # Check Python (for ML training)
    if command -v python3 &> /dev/null; then
        log_success "Python 3 found - ML training available"
        PYTHON_AVAILABLE=true
    else
        log_warning "Python 3 not found - ML training will be skipped"
        PYTHON_AVAILABLE=false
    fi
    
    log_success "Prerequisites check completed"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    
    # Frontend dependencies
    log_info "Installing frontend dependencies..."
    npm install
    
    # Backend dependencies
    if [ -d "backend" ]; then
        log_info "Installing backend dependencies..."
        cd backend
        npm install
        cd ..
    fi
    
    # ML training dependencies
    if [ "$PYTHON_AVAILABLE" = true ] && [ -d "ml-training" ]; then
        log_info "Installing ML training dependencies..."
        cd ml-training
        pip3 install -r requirements.txt
        cd ..
    fi
    
    log_success "Dependencies installed successfully"
}

# Train ML models
train_models() {
    if [ "$PYTHON_AVAILABLE" = true ] && [ -d "ml-training" ]; then
        log_info "Training ML models..."
        cd ml-training
        python3 train_models.py
        cd ..
        log_success "ML models trained successfully"
    else
        log_warning "Skipping ML training - Python not available or ml-training directory not found"
    fi
}

# Build frontend
build_frontend() {
    log_info "Building frontend..."
    npm run build
    log_success "Frontend built successfully"
}

# Deploy locally
deploy_local() {
    log_info "Starting local deployment..."
    
    # Start MongoDB (if available)
    if command -v mongod &> /dev/null; then
        log_info "Starting MongoDB..."
        mongod --dbpath ./data/db --port $MONGODB_PORT &
        MONGODB_PID=$!
        log_success "MongoDB started on port $MONGODB_PORT"
    else
        log_warning "MongoDB not found - using in-memory storage"
    fi
    
    # Start backend
    if [ -d "backend" ]; then
        log_info "Starting backend server..."
        cd backend
        npm start &
        BACKEND_PID=$!
        cd ..
        log_success "Backend started on port $BACKEND_PORT"
    fi
    
    # Start frontend
    log_info "Starting frontend server..."
    npm start &
    FRONTEND_PID=$!
    log_success "Frontend started on port $FRONTEND_PORT"
    
    log_success "Local deployment completed!"
    log_info "🌐 Frontend: http://localhost:$FRONTEND_PORT"
    log_info "🔧 Backend API: http://localhost:$BACKEND_PORT"
    log_info "📊 MongoDB: mongodb://localhost:$MONGODB_PORT"
    
    # Save PIDs for cleanup
    echo $FRONTEND_PID > .frontend.pid
    echo $BACKEND_PID > .backend.pid
    echo $MONGODB_PID > .mongodb.pid
}

# Deploy with Docker
deploy_docker() {
    if [ "$DOCKER_AVAILABLE" = true ]; then
        log_info "Starting Docker deployment..."
        
        # Build and start services
        docker-compose up --build -d
        
        log_success "Docker deployment completed!"
        log_info "🌐 Frontend: http://localhost:$FRONTEND_PORT"
        log_info "🔧 Backend API: http://localhost:$BACKEND_PORT"
        log_info "📊 MongoDB: mongodb://localhost:$MONGODB_PORT"
        
        # Show running containers
        docker-compose ps
    else
        log_error "Docker not available - cannot perform Docker deployment"
        exit 1
    fi
}

# Deploy to production (Vercel + Railway)
deploy_production() {
    log_info "Deploying to production..."
    
    # Deploy frontend to Vercel
    if command -v vercel &> /dev/null; then
        log_info "Deploying frontend to Vercel..."
        vercel --prod
        log_success "Frontend deployed to Vercel"
    else
        log_warning "Vercel CLI not found - skipping frontend deployment"
        log_info "Manual deployment: npm run build && upload to your hosting provider"
    fi
    
    # Deploy backend (instructions)
    log_info "Backend deployment instructions:"
    log_info "1. Push backend/ directory to your Git repository"
    log_info "2. Connect to Railway/Render/Heroku"
    log_info "3. Set environment variables:"
    log_info "   - NODE_ENV=production"
    log_info "   - MONGODB_URI=<your-mongodb-connection-string>"
    log_info "   - PORT=5000"
    
    log_success "Production deployment instructions provided"
}

# Cleanup function
cleanup() {
    log_info "Cleaning up..."
    
    # Kill local processes
    if [ -f .frontend.pid ]; then
        kill $(cat .frontend.pid) 2>/dev/null || true
        rm .frontend.pid
    fi
    
    if [ -f .backend.pid ]; then
        kill $(cat .backend.pid) 2>/dev/null || true
        rm .backend.pid
    fi
    
    if [ -f .mongodb.pid ]; then
        kill $(cat .mongodb.pid) 2>/dev/null || true
        rm .mongodb.pid
    fi
    
    log_success "Cleanup completed"
}

# Health check
health_check() {
    log_info "Performing health check..."
    
    # Check frontend
    if curl -f http://localhost:$FRONTEND_PORT > /dev/null 2>&1; then
        log_success "Frontend is healthy"
    else
        log_error "Frontend health check failed"
    fi
    
    # Check backend
    if curl -f http://localhost:$BACKEND_PORT/api/health > /dev/null 2>&1; then
        log_success "Backend is healthy"
    else
        log_error "Backend health check failed"
    fi
}

# Main deployment logic
main() {
    case "${1:-local}" in
        "local")
            check_prerequisites
            install_dependencies
            train_models
            build_frontend
            deploy_local
            sleep 5
            health_check
            ;;
        "docker")
            check_prerequisites
            deploy_docker
            sleep 10
            health_check
            ;;
        "production")
            check_prerequisites
            install_dependencies
            train_models
            build_frontend
            deploy_production
            ;;
        "train")
            check_prerequisites
            train_models
            ;;
        "build")
            check_prerequisites
            install_dependencies
            build_frontend
            ;;
        "clean")
            cleanup
            ;;
        "health")
            health_check
            ;;
        *)
            echo "Usage: $0 {local|docker|production|train|build|clean|health}"
            echo ""
            echo "Commands:"
            echo "  local      - Deploy locally with Node.js"
            echo "  docker     - Deploy using Docker Compose"
            echo "  production - Deploy to production (Vercel + Railway)"
            echo "  train      - Train ML models only"
            echo "  build      - Build frontend only"
            echo "  clean      - Stop all services and cleanup"
            echo "  health     - Check service health"
            exit 1
            ;;
    esac
}

# Trap cleanup on exit
trap cleanup EXIT

# Run main function
main "$@"