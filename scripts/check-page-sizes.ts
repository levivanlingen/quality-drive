import prisma from '../lib/prisma';

async function checkPageSizes() {
  console.log('🔍 Checking Page table data sizes...\n');

  try {
    // Get page count
    const totalPages = await prisma.page.count();
    console.log(`Total pages: ${totalPages}\n`);

    // Get pages with content size
    const pages = await prisma.page.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        content: true,
      },
    });

    // Calculate sizes
    const pageSizes = pages.map(page => ({
      id: page.id,
      slug: page.slug,
      title: page.title,
      contentLength: page.content?.length || 0,
      contentSizeKB: ((page.content?.length || 0) / 1024).toFixed(2),
    }));

    // Sort by size
    pageSizes.sort((a, b) => b.contentLength - a.contentLength);

    console.log('📊 Top 10 largest pages by content size:\n');
    pageSizes.slice(0, 10).forEach((page, idx) => {
      console.log(`${idx + 1}. ${page.slug}`);
      console.log(`   Content: ${page.contentSizeKB} KB (${page.contentLength.toLocaleString()} chars)`);
      console.log('');
    });

    // Total size
    const totalSize = pageSizes.reduce((sum, p) => sum + p.contentLength, 0);
    const totalSizeMB = (totalSize / 1024 / 1024).toFixed(2);

    console.log(`📦 Total content size: ${totalSizeMB} MB\n`);

    // Check for potential issues
    const hugePages = pageSizes.filter(p => p.contentLength > 100000);
    if (hugePages.length > 0) {
      console.log(`⚠️  Found ${hugePages.length} pages with content > 100KB`);
      console.log('   This might cause Railway GUI to timeout or crash\n');
    }

    // Check for null/empty content
    const emptyPages = pageSizes.filter(p => p.contentLength === 0);
    console.log(`📄 Pages with empty content: ${emptyPages.length}`);

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkPageSizes();
