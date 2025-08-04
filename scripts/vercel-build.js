#!/usr/bin/env node

/**
 * Vercel build script for HyperHash.ai
 * This script ensures proper Prisma setup in the Vercel environment
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function runCommand(command, description) {
  console.log(`🔄 ${description}...`);
  try {
    execSync(command, { stdio: 'inherit', env: process.env });
    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    throw error;
  }
}

async function main() {
  console.log('🚀 Starting HyperHash.ai build process...');

  // Set default DATABASE_URL if not provided
  if (!process.env.DATABASE_URL) {
    console.log('⚠️  DATABASE_URL not set, using default SQLite path');
    process.env.DATABASE_URL = 'file:./prisma/dev.db';
  }

  try {
    // Ensure prisma directory exists
    const prismaDir = path.join(process.cwd(), 'prisma');
    if (!fs.existsSync(prismaDir)) {
      fs.mkdirSync(prismaDir, { recursive: true });
      console.log('📁 Created prisma directory');
    }

    // Generate Prisma client
    runCommand('npx prisma generate', 'Generating Prisma client');

    // Setup database (create tables if they don't exist)
    try {
      runCommand('npx prisma db push --accept-data-loss', 'Setting up database schema');
    } catch (error) {
      console.log('⚠️  Database push failed, but continuing build (may already exist)');
    }

    // Build Next.js application
    runCommand('npx next build', 'Building Next.js application');

    console.log('🎉 Build completed successfully!');
    
  } catch (error) {
    console.error('💥 Build failed:', error);
    process.exit(1);
  }
}

main();
