import prisma from '../lib/prisma';

async function verifyData() {
  console.log('🔍 Verifying database connection and data...\n');

  try {
    // Test connection
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Check tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    console.log('\n📋 Tables in database:');
    console.log(tables);

    // Count records
    const pageCount = await prisma.page.count();
    const locationCount = await prisma.location.count();

    console.log('\n📊 Record counts:');
    console.log(`  Pages: ${pageCount}`);
    console.log(`  Locations: ${locationCount}`);

    // Show some actual data
    if (pageCount > 0) {
      console.log('\n📄 First 10 pages:');
      const pages = await prisma.page.findMany({
        take: 10,
        select: {
          id: true,
          slug: true,
          title: true,
          category: true,
        },
        orderBy: {
          id: 'asc',
        },
      });

      pages.forEach(p => {
        console.log(`  [${p.id}] ${p.slug} - ${p.title} (${p.category})`);
      });
    } else {
      console.log('\n⚠️  NO PAGES FOUND IN DATABASE!');
      console.log('Run: npm run db:seed');
    }

    if (locationCount > 0) {
      console.log('\n📍 Locations:');
      const locations = await prisma.location.findMany({
        select: {
          id: true,
          name: true,
          slug: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      locations.forEach(l => {
        console.log(`  [${l.id}] ${l.name} (${l.slug})`);
      });
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

verifyData();
