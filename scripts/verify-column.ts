import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyColumn() {
  try {
    console.log('🔍 Checking database connection and column...\n');

    // Get connection info
    const result = await prisma.$queryRaw<Array<{
      table_name: string;
      column_name: string;
      data_type: string;
    }>>`
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'Page'
      AND column_name LIKE '%featured%'
      ORDER BY ordinal_position;
    `;

    console.log('Featured image columns in Page table:');
    console.log(result);

    console.log('\n✅ Test: Query with featuredImageAlt');
    const testPage = await prisma.$queryRaw<Array<any>>`
      SELECT slug, "featuredImage", "featuredImageAlt"
      FROM "Page"
      WHERE slug = 'rijschool-den-haag'
      LIMIT 1;
    `;

    console.log(testPage);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyColumn();
