import { prisma } from './database/prisma';

/**
 * Database connection utility
 * This ensures the database is ready before any operations
 */
export class DatabaseUtil {
  private static isConnected = false;
  
  /**
   * Test database connection and initialize if needed
   */
  static async ensureConnection(): Promise<void> {
    if (this.isConnected) {
      return;
    }
    
    try {
      // Test the connection
      await prisma.$connect();
      
      // Try a simple query to ensure tables exist
      await prisma.$queryRaw`SELECT 1 as test`;
      
      this.isConnected = true;
      console.log('✅ Database connection established');
    } catch (error) {
      console.error('❌ Database connection failed:', error);
      
      // In production, we might want to create the database if it doesn't exist
      if (process.env.NODE_ENV === 'production') {
        try {
          // Try to create the database structure
          console.log('🔧 Attempting to initialize database...');
          await prisma.$queryRaw`PRAGMA journal_mode=WAL`;
          this.isConnected = true;
          console.log('✅ Database initialized successfully');
        } catch (initError) {
          console.error('❌ Database initialization failed:', initError);
          throw new Error('Database is not accessible and could not be initialized');
        }
      } else {
        throw error;
      }
    }
  }
  
  /**
   * Gracefully disconnect from the database
   */
  static async disconnect(): Promise<void> {
    try {
      await prisma.$disconnect();
      this.isConnected = false;
      console.log('✅ Database disconnected');
    } catch (error) {
      console.error('⚠️ Error disconnecting from database:', error);
    }
  }
}

export { prisma };
