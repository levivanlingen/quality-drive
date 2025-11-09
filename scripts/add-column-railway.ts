import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

async function addColumnToRailway() {
  console.log('🔧 Adding featuredImageAlt column to Railway database...\n');

  try {
    // Check database connection
    await prisma.$connect();
    console.log('✅ Connected to database');

    // Add column if it doesn't exist
    await prisma.$executeRaw`
      ALTER TABLE "Page" ADD COLUMN IF NOT EXISTS "featuredImageAlt" TEXT;
    `;

    console.log('✅ Column added/verified successfully');

    // Test query
    const testPage = await prisma.page.findFirst({
      where: { slug: 'rijschool-den-haag' },
      select: {
        slug: true,
        featuredImage: true,
        featuredImageAlt: true,
      },
    });

    console.log('\n📝 Test query result:');
    console.log(testPage);

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

addColumnToRailway();
