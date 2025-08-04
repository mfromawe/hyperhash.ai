import { PrismaClient } from '@prisma/client';

declare global {
  var __prisma: PrismaClient | undefined;
}

// Singleton pattern for Prisma Client with optimized configuration for Vercel
let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Production configuration optimized for Vercel
  prisma = new PrismaClient({
    log: ['error'],
    datasources: {
      db: {
        url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
      },
    },
    // Optimize for serverless
    errorFormat: 'minimal',
  });
} else {
  // Development configuration with more logging
  if (!globalThis.__prisma) {
    globalThis.__prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
      datasources: {
        db: {
          url: process.env.DATABASE_URL || 'file:./prisma/dev.db',
        },
      },
      errorFormat: 'pretty',
    });
  }
  prisma = globalThis.__prisma;
}

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };
