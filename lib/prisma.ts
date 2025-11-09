import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Read DATABASE_URL directly from .env file to avoid Replit's auto-injection
const getDatabaseUrl = () => {
  try {
    const envPath = path.join(process.cwd(), '.env');
    const envContent = fs.readFileSync(envPath, 'utf8');
    const match = envContent.match(/^DATABASE_URL=(.+)$/m);

    if (match && match[1]) {
      const url = match[1].trim();
      console.log('🚂 Using Railway database from .env file');
      return url;
    }
  } catch (error) {
    console.warn('⚠️  Could not read .env file:', error);
  }

  // Fallback to Railway URL
  const railwayUrl = 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway';
  console.log('🚂 Using Railway database (fallback)');
  return railwayUrl;
};

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: {
      db: {
        url: getDatabaseUrl(),
      },
    },
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
