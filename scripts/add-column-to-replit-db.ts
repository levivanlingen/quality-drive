import { PrismaClient } from '@prisma/client';

// Connect directly to Replit's helium database
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Use the actual DATABASE_URL (helium)
    },
  },
  log: ['query', 'info', 'warn', 'error'],
});

async function addColumnToReplitDB() {
  console.log('🔧 Adding featuredImageAlt column to Replit helium database...\n');

  try {
    // Check database connection
    await prisma.$connect();

    const dbInfo = await prisma.$queryRaw<Array<{ current_database: string }>>`
      SELECT current_database() as current_database;
    `;
    console.log(`✅ Connected to database: ${dbInfo[0].current_database}`);

    // Add column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "featuredImageAlt" TEXT;
    `;

    console.log('✅ Column added/verified successfully');

    // Verify column exists
    const columns = await prisma.$queryRaw<Array<{ column_name: string }>>`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'Page'
      AND column_name = 'featuredImageAlt';
    `;

    if (columns.length > 0) {
      console.log('✅ Verified: featuredImageAlt column exists\n');
    }

    // Test query
    const testPage = await prisma.$queryRaw<Array<any>>`
      SELECT slug, "featuredImage", "featuredImageAlt"
      FROM "Page"
      WHERE slug = 'rijschool-den-haag'
      LIMIT 1;
    `;

    console.log('📝 Test query result:');
    console.log(testPage[0]);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addColumnToReplitDB();
