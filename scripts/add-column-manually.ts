import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function addColumn() {
  console.log('🔧 Manually adding featuredImageAlt column if it doesn\'t exist...\n');

  try {
    await prisma.$executeRaw`
      DO $$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM information_schema.columns
          WHERE table_name = 'Page' AND column_name = 'featuredImageAlt'
        ) THEN
          ALTER TABLE "Page" ADD COLUMN "featuredImageAlt" TEXT;
          RAISE NOTICE 'Column featuredImageAlt added successfully';
        ELSE
          RAISE NOTICE 'Column featuredImageAlt already exists';
        END IF;
      END $$;
    `;

    console.log('✅ Column check/add completed successfully');

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

addColumn();
