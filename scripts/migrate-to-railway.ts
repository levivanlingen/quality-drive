import { PrismaClient } from '@prisma/client';

// Connect to Replit database (current)
const replitDb = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:password@helium/heliumdb?sslmode=disable'
    }
  }
});

// Connect to Railway database (target)
const railwayDb = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway'
    }
  }
});

async function migrateData() {
  try {
    console.log('🚀 Starting migration from Replit to Railway...\n');

    // Export from Replit
    console.log('📤 Exporting data from Replit database...');
    const locations = await replitDb.location.findMany();
    const pages = await replitDb.page.findMany();

    console.log(`  Found ${locations.length} locations`);
    console.log(`  Found ${pages.length} pages`);

    // Clear Railway database
    console.log('\n🗑️  Clearing Railway database...');
    await railwayDb.page.deleteMany();
    await railwayDb.location.deleteMany();

    // Import to Railway
    console.log('\n📥 Importing to Railway database...');

    // Import locations first
    for (const location of locations) {
      await railwayDb.location.create({
        data: {
          id: location.id,
          name: location.name,
          slug: location.slug,
          createdAt: location.createdAt,
          updatedAt: location.updatedAt,
        },
      });
    }
    console.log(`  ✅ Imported ${locations.length} locations`);

    // Import pages
    for (const page of pages) {
      await railwayDb.page.create({
        data: {
          id: page.id,
          wordpressId: page.wordpressId,
          slug: page.slug,
          title: page.title,
          content: page.content,
          excerpt: page.excerpt,
          category: page.category,
          locationId: page.locationId,
          featuredImage: page.featuredImage,
          seoTitle: page.seoTitle,
          seoDescription: page.seoDescription,
          seoKeywords: page.seoKeywords,
          originalUrl: page.originalUrl,
          publishedAt: page.publishedAt,
          parentId: page.parentId,
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
        },
      });
    }
    console.log(`  ✅ Imported ${pages.length} pages`);

    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await replitDb.$disconnect();
    await railwayDb.$disconnect();
  }
}

migrateData();
