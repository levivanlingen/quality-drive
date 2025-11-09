import { PrismaClient } from '@prisma/client';

// Use Railway database URL directly
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function verify() {
  try {
    console.log('🔍 Checking Railway database...\n');

    const dbInfo = await prisma.$queryRaw<Array<{ current_database: string }>>`
      SELECT current_database() as current_database;
    `;
    console.log(`Database: ${dbInfo[0].current_database}`);

    // Check for featuredImageAlt column
    const columns = await prisma.$queryRaw<Array<{ column_name: string; data_type: string }>>`
      SELECT column_name, data_type
      FROM information_schema.columns
      WHERE table_name = 'Page'
      AND column_name = 'featuredImageAlt';
    `;

    if (columns.length > 0) {
      console.log(`✅ featuredImageAlt column EXISTS`);
      console.log(`   Type: ${columns[0].data_type}\n`);

      // Test data
      const testPage = await prisma.page.findFirst({
        where: { slug: 'rijschool-den-haag' },
        select: {
          slug: true,
          featuredImage: true,
          featuredImageAlt: true,
        },
      });

      console.log('📝 Test data:');
      console.log(testPage);
    } else {
      console.log('❌ featuredImageAlt column NOT FOUND\n');
      console.log('Adding column now...');

      await prisma.$executeRaw`
        ALTER TABLE "Page" ADD COLUMN "featuredImageAlt" TEXT;
      `;

      console.log('✅ Column added!');
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
