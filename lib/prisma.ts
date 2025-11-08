import { PrismaClient } from '@prisma/client';

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Force Railway database if Replit's helium database is detected or if DATABASE_URL is missing
const getDatabaseUrl = () => {
  const envUrl = process.env.DATABASE_URL;
  const railwayUrl = 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway';

  // If no DATABASE_URL, use Railway
  if (!envUrl) {
    console.warn('⚠️  No DATABASE_URL found, using Railway database');
    return railwayUrl;
  }

  // If URL contains 'helium' (Replit auto-injected), use Railway instead
  if (envUrl.includes('helium')) {
    console.warn('⚠️  Detected Replit database, switching to Railway database');
    return railwayUrl;
  }

  return envUrl;
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
