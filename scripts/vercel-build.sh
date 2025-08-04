#!/bin/bash

# Vercel build script for HyperHash.ai
# This script ensures proper Prisma setup in the Vercel environment

set -e

echo "🚀 Starting HyperHash.ai build process..."

# Set default DATABASE_URL if not provided
if [ -z "$DATABASE_URL" ]; then
  echo "⚠️  DATABASE_URL not set, using default SQLite path"
  export DATABASE_URL="file:./prisma/dev.db"
fi

echo "📦 Installing dependencies..."
npm ci

echo "🔧 Generating Prisma client..."
npx prisma generate

echo "🗄️  Setting up database..."
# For SQLite in Vercel, we need to ensure the directory exists
mkdir -p ./prisma

# Push the schema to create tables (works for both new and existing databases)
npx prisma db push --accept-data-loss || echo "⚠️  Database push skipped (may already exist)"

echo "🏗️  Building Next.js application..."
npx next build

echo "✅ Build completed successfully!"
