#!/bin/bash

# FastAPI Portfolio Vercel Deployment Script

echo "🚀 Preparing FastAPI Portfolio for Vercel deployment..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Please install it first:"
    echo "npm install -g vercel"
    exit 1
fi

# Check if we're in the right directory
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found. Make sure you're in the project root directory."
    exit 1
fi

echo "✅ Environment check passed"

# Deploy to Vercel
echo "🔄 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your FastAPI portfolio should now be live on Vercel"
