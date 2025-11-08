import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway'
    }
  }
});

async function applyFix() {
  console.log('🔧 Applying Railway GUI fix...\n');

  try {
    // Drop existing view
    await prisma.$executeRawUnsafe(`DROP VIEW IF EXISTS "PageLight"`);
    console.log('✅ Dropped old view (if exists)');

    // Create lightweight view
    await prisma.$executeRawUnsafe(`
      CREATE VIEW "PageLight" AS
      SELECT
        id,
        "wordpressId",
        slug,
        title,
        LEFT(content, 200) as content_preview,
        LENGTH(content) as content_length,
        excerpt,
        category,
        "locationId",
        "featuredImage",
        "seoTitle",
        "seoDescription",
        "seoKeywords",
        "originalUrl",
        "publishedAt",
        "parentId",
        "createdAt",
        "updatedAt"
      FROM "Page"
      ORDER BY id
    `);
    console.log('✅ Created PageLight view');

    console.log('\n🎉 Fix applied successfully!');
    console.log('\n📋 In Railway GUI, use this query:');
    console.log('   SELECT * FROM "PageLight";');
    console.log('\nThis will load instantly without the heavy HTML content!');

  } catch (error: any) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

applyFix();
