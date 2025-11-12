import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function checkMotorrijschoolPages() {
  console.log('🔍 Checking motorrijschool pages in database...\n');

  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_MOTOR,
      },
      select: {
        id: true,
        slug: true,
        title: true,
        featuredImage: true,
        location: {
          select: {
            name: true,
          },
        },
      },
    });

    console.log(`Found ${pages.length} motorrijschool pages:\n`);

    pages.forEach(page => {
      console.log(`- ${page.slug}`);
      console.log(`  Title: ${page.title}`);
      console.log(`  Location: ${page.location?.name || 'N/A'}`);
      console.log(`  Featured Image: ${page.featuredImage || 'NULL'}\n`);
    });

    // Also check all pages to see what categories exist
    const allPages = await prisma.page.findMany({
      select: {
        slug: true,
        category: true,
      },
      where: {
        slug: {
          contains: 'motor',
        },
      },
    });

    console.log(`\nAll pages containing 'motor' (${allPages.length}):`);
    allPages.forEach(page => {
      console.log(`- ${page.slug} (${page.category})`);
    });

  } catch (error) {
    console.error('Error:', error);
  }
}

checkMotorrijschoolPages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
