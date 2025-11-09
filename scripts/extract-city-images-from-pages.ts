import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Extract city-specific images from pages.json content and set as featured images
 * This ensures we only use images that are already associated with each specific page
 */
async function extractAndSetCityImages() {
  console.log('🔍 Reading pages.json...\n');

  // Read pages.json
  const pagesJsonPath = path.join(process.cwd(), 'data', 'pages.json');
  const pagesData = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));

  console.log(`Found ${pagesData.length} pages in pages.json\n`);

  // Filter rijschool pages
  const rijschoolPages = pagesData.filter((page: any) =>
    page.slug && page.slug.startsWith('rijschool-')
  );

  console.log(`Found ${rijschoolPages.length} rijschool pages\n`);
  console.log('📸 Extracting city-specific images from content...\n');

  const updates: Array<{
    slug: string;
    cityImage: string;
    altText: string;
    allImages: string[];
  }> = [];

  // City name patterns to match in image filenames
  const cityPatterns = [
    { pattern: /denhaag|den-haag|the-hague|scheveningen/i, cities: ['den-haag'] },
    { pattern: /zoetermeer/i, cities: ['zoetermeer'] },
    { pattern: /delft/i, cities: ['delft'] },
    { pattern: /rijswijk/i, cities: ['rijswijk'] },
    { pattern: /voorburg|leidschendam/i, cities: ['voorburg'] },
    { pattern: /nootdorp/i, cities: ['nootdorp'] },
    { pattern: /berkel.*rodenrijs/i, cities: ['berkel-en-rodenrijs'] },
    { pattern: /bergschenhoek/i, cities: ['bergschenhoek'] },
    { pattern: /bleiswijk/i, cities: ['bleiswijk'] },
    { pattern: /lansingerland/i, cities: ['lansingerland'] },
    { pattern: /pijnacker/i, cities: ['pijnacker'] },
  ];

  for (const page of rijschoolPages) {
    const content = page.content || '';
    const slug = page.slug;

    // Extract all img tags with src and alt
    const imgTagRegex = /<img[^>]*>/g;
    const imgTags = [...content.matchAll(imgTagRegex)].map(m => m[0]);

    // Parse each img tag to extract url, filename, and alt text
    const imageData = imgTags.map(tag => {
      const srcMatch = tag.match(/src="([^"]+)"/);
      const altMatch = tag.match(/alt="([^"]*)"/);

      const url = srcMatch ? srcMatch[1] : '';
      const filename = url.split('/').pop() || '';
      const alt = altMatch ? altMatch[1] : '';

      return { url, filename, alt };
    }).filter(img => img.url && img.url.match(/\.(?:jpeg|jpg|png|gif|webp|svg)$/i));

    const uniqueImageUrls = [...new Set(imageData.map(i => i.url))];
    const imageFilenames = imageData;

    // Determine which city this page is for
    const pageCity = slug.replace('rijschool-', '').replace('rijschool-automaat-', '');

    // Find city-specific image with alt text
    let cityImage: string | null = null;
    let cityImageAlt: string = '';

    // First, try to find exact match for this city
    for (const { pattern, cities } of cityPatterns) {
      if (cities.includes(pageCity)) {
        // Look for images matching this city pattern
        const matchingImage = imageFilenames.find(img => pattern.test(img.filename));
        if (matchingImage) {
          // Convert to relative path
          const urlParts = matchingImage.url.split('/');
          const uploadsIndex = urlParts.indexOf('wp-content');
          if (uploadsIndex !== -1) {
            cityImage = '/uploads/' + urlParts.slice(uploadsIndex + 2).join('/');
            cityImageAlt = matchingImage.alt || '';
          }
          break;
        }
      }
    }

    if (cityImage) {
      updates.push({
        slug,
        cityImage,
        altText: cityImageAlt,
        allImages: uniqueImageUrls.map(url => url.split('/').pop() || '').slice(0, 5),
      });

      console.log(`✅ ${slug}`);
      console.log(`   City Image: ${cityImage}`);
      console.log(`   Alt Text: ${cityImageAlt || '(empty)'}`);
      console.log(`   (Found from ${uniqueImageUrls.length} total images in content)`);
      console.log('');
    } else {
      console.log(`⚠️  ${slug}`);
      console.log(`   No city-specific image found`);
      console.log(`   Images in content: ${uniqueImageUrls.length}`);
      if (imageFilenames.length > 0) {
        console.log(`   First few: ${imageFilenames.slice(0, 3).map(i => i.filename).join(', ')}`);
      }
      console.log('');
    }
  }

  console.log('\n📊 Summary:');
  console.log(`   Pages with city images found: ${updates.length}`);
  console.log(`   Pages without city images: ${rijschoolPages.length - updates.length}`);

  // Ask for confirmation before updating database
  console.log('\n🔄 Updating database with featured images...\n');

  let updated = 0;
  let errors = 0;

  for (const { slug, cityImage, altText } of updates) {
    try {
      const result = await prisma.page.updateMany({
        where: { slug },
        data: {
          featuredImage: cityImage,
          featuredImageAlt: altText || null,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated ${slug}`);
        console.log(`   Image: ${cityImage}`);
        console.log(`   Alt: ${altText || '(none)'}`);
        updated++;
      } else {
        console.log(`⚠️  Page not found in database: ${slug}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
      errors++;
    }
  }

  console.log(`\n📊 Database Update Summary:`);
  console.log(`   Updated: ${updated}`);
  console.log(`   Errors: ${errors}`);
  console.log(`   Total attempted: ${updates.length}`);
}

extractAndSetCityImages()
  .catch((error) => {
    console.error('❌ Fatal error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
