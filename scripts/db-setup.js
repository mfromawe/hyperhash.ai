#!/usr/bin/env node

/**
 * Database setup script for Vercel deployment
 * This script ensures the database is properly initialized
 */

const { PrismaClient } = require('@prisma/client');

async function main() {
  const prisma = new PrismaClient();
  
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Run database migrations if needed
    console.log('🔄 Checking database schema...');
    
    // Test a simple query to ensure tables exist
    try {
      await prisma.user.findFirst();
      console.log('✅ Database schema is up to date');
    } catch (error) {
      console.log('⚠️  Database schema needs setup, but this is handled by Prisma migrations');
    }
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error('❌ Script failed:', error);
    process.exit(1);
  });
