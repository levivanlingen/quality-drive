import prisma from '../lib/prisma';

async function checkDatabase() {
  console.log('📊 Database Statistics:\n');

  // Count total pages
  const totalPages = await prisma.page.count();
  console.log(`Total pages in database: ${totalPages}`);

  // Pages by category
  const byCategory = await prisma.page.groupBy({
    by: ['category'],
    _count: true,
  });

  console.log('\nPages by category:');
  byCategory.forEach(cat => {
    console.log(`  ${cat.category}: ${cat._count} pages`);
  });

  // Total locations
  const totalLocations = await prisma.location.count();
  console.log(`\nTotal locations: ${totalLocations}`);

  // Sample pages
  console.log('\nSample pages:');
  const samples = await prisma.page.findMany({
    take: 5,
    select: {
      slug: true,
      title: true,
      category: true,
      location: {
        select: {
          name: true,
        },
      },
    },
  });

  samples.forEach(page => {
    console.log(`  - ${page.slug} (${page.category})${page.location ? ` - ${page.location.name}` : ''}`);
  });
}

checkDatabase()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
