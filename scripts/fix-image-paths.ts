import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

// Use Railway database directly
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function fixImagePaths() {
  console.log('🔧 Fixing image paths to match actual file locations...\n');

  // Get all pages with featured images
  const pages = await prisma.page.findMany({
    where: {
      featuredImage: { not: null },
      slug: { startsWith: 'rijschool-' },
    },
    select: {
      id: true,
      slug: true,
      featuredImage: true,
    },
  });

  console.log(`Found ${pages.length} pages with featured images\n`);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const availableFiles = fs.readdirSync(uploadsDir);

  let updated = 0;
  let notFound = 0;

  for (const page of pages) {
    if (!page.featuredImage) continue;

    // Extract filename from path (remove /uploads/2022/04/ or similar)
    const currentPath = page.featuredImage;
    const filename = currentPath.split('/').pop() || '';

    // Remove the -1024x512 or similar size suffix and try to find the file
    const baseFilename = filename.replace(/-\d+x\d+(\.\w+)$/, '$1');

    // Check if file exists in uploads directory
    let actualFilename = null;

    // Try exact match first
    if (availableFiles.includes(filename)) {
      actualFilename = filename;
    }
    // Try base filename (without size)
    else if (availableFiles.includes(baseFilename)) {
      actualFilename = baseFilename;
    }
    // Try to find similar file (same base name)
    else {
      const nameWithoutExt = baseFilename.replace(/\.\w+$/, '');
      const match = availableFiles.find(f => f.startsWith(nameWithoutExt));
      if (match) {
        actualFilename = match;
      }
    }

    if (actualFilename) {
      const newPath = `/uploads/${actualFilename}`;

      if (newPath !== currentPath) {
        await prisma.page.update({
          where: { id: page.id },
          data: { featuredImage: newPath },
        });

        console.log(`✅ ${page.slug}`);
        console.log(`   Old: ${currentPath}`);
        console.log(`   New: ${newPath}\n`);
        updated++;
      }
    } else {
      console.log(`❌ ${page.slug}: File not found for ${filename}\n`);
      notFound++;
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Not found: ${notFound}`);

  await prisma.$disconnect();
}

fixImagePaths();
