import prisma from '../lib/prisma';

async function createView() {
  console.log('📋 Creating PageSummary view for Railway GUI...\n');

  try {
    // Drop view if exists
    await prisma.$executeRawUnsafe(`
      DROP VIEW IF EXISTS "PageSummary";
    `);

    // Create view without content column
    await prisma.$executeRawUnsafe(`
      CREATE VIEW "PageSummary" AS
      SELECT
        id,
        "wordpressId",
        slug,
        title,
        category,
        "locationId",
        "featuredImage",
        "seoTitle",
        "seoDescription",
        LENGTH(content) as content_length,
        "publishedAt",
        "createdAt",
        "updatedAt"
      FROM "Page"
      ORDER BY id;
    `);

    console.log('✅ View created successfully!');
    console.log('\nYou can now query in Railway GUI:');
    console.log('SELECT * FROM "PageSummary";');

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createView();
