import fs from 'fs';
import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

interface PageData {
  id: number;
  slug: string;
  title: string;
  content: string;
  featuredImage: string | null;
  featuredImageAlt: string | null;
}

// Extract featured image from HTML content
function extractFeaturedImage(content: string): { image: string | null; alt: string | null } {
  // Look for img tag in content with pattern: <img ... src="..." alt="..." />
  const imgRegex = /<img[^>]+src="([^"]+)"[^>]*alt="([^"]*)"/i;
  const match = content.match(imgRegex);

  if (match) {
    return {
      image: match[1],
      alt: match[2] || null,
    };
  }

  return { image: null, alt: null };
}

async function extractAndUpdateImages() {
  console.log('📸 Extracting featured images from pages.json...\n');

  // Read pages.json
  const pagesData = JSON.parse(fs.readFileSync('/home/runner/workspace/data/pages.json', 'utf-8')) as PageData[];

  // Filter motorrijschool pages
  const motorrijschoolPages = pagesData.filter(page =>
    page.slug.startsWith('motorrijschool-') &&
    page.slug !== 'motorrijschool-lansingerland' // This might not be in JSON
  );

  console.log(`Found ${motorrijschoolPages.length} motorrijschool pages in JSON\n`);

  for (const page of motorrijschoolPages) {
    console.log(`\n=== ${page.slug} ===`);

    // Extract image from content
    const { image, alt } = extractFeaturedImage(page.content);

    if (image) {
      console.log(`Image found: ${image}`);
      console.log(`Alt: ${alt || 'N/A'}`);

      // Convert WordPress URL to local path
      let localImage = image;
      if (image.startsWith('https://quality-drive.nl/wp-content/uploads/')) {
        localImage = image.replace('https://quality-drive.nl/wp-content/uploads/', '/uploads/');
      }

      console.log(`Local path: ${localImage}`);

      // Update database
      try {
        const result = await prisma.page.updateMany({
          where: {
            slug: page.slug,
            category: PageCategory.RIJSCHOOL_MOTOR,
          },
          data: {
            featuredImage: localImage,
            featuredImageAlt: alt || `Motorrijschool ${page.title.replace('Motorrijschool ', '')} - Quality Drive`,
          },
        });

        if (result.count > 0) {
          console.log(`✅ Updated in database`);
        } else {
          console.log(`⚠️  Not found in database`);
        }
      } catch (error) {
        console.error(`❌ Error:`, error);
      }
    } else {
      console.log(`⚠️  No image found in content`);
    }
  }

  console.log('\n\n✅ Done!');
}

extractAndUpdateImages()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
