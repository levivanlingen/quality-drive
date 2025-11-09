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

async function updateImages() {
  console.log('🔍 Reading pages.json...\n');

  const pagesJsonPath = path.join(process.cwd(), 'data', 'pages.json');
  const pagesData = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));

  // City patterns
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
  ];

  const rijschoolPages = pagesData.filter((p: any) => p.slug && p.slug.startsWith('rijschool-'));

  console.log(`Found ${rijschoolPages.length} rijschool pages\n`);

  let updated = 0;

  for (const page of rijschoolPages) {
    const content = page.content || '';
    const slug = page.slug;

    // Extract img tags
    const imgTagRegex = /<img[^>]*>/g;
    const imgTags = [...content.matchAll(imgTagRegex)].map(m => m[0]);

    const imageData = imgTags.map((tag: string) => {
      const srcMatch = tag.match(/src="([^"]+)"/);
      const altMatch = tag.match(/alt="([^"]*)"/);

      const url = srcMatch ? srcMatch[1] : '';
      const filename = url.split('/').pop() || '';
      const alt = altMatch ? altMatch[1] : '';

      return { url, filename, alt };
    }).filter(img => img.url && img.url.match(/\.(?:jpeg|jpg|png|gif|webp|svg)$/i));

    const pageCity = slug.replace('rijschool-', '').replace('rijschool-automaat-', '');

    // Find city image
    let cityImage: string | null = null;
    let cityImageAlt: string = '';

    for (const { pattern, cities } of cityPatterns) {
      if (cities.includes(pageCity)) {
        const matchingImage = imageData.find((img: any) => pattern.test(img.filename));
        if (matchingImage) {
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
      try {
        const result = await prisma.page.updateMany({
          where: { slug },
          data: {
            featuredImage: cityImage,
            featuredImageAlt: cityImageAlt || null,
          },
        });

        if (result.count > 0) {
          console.log(`✅ ${slug}`);
          console.log(`   Image: ${cityImage}`);
          console.log(`   Alt: ${cityImageAlt || '(none)'}\n`);
          updated++;
        }
      } catch (error) {
        console.error(`❌ Error updating ${slug}:`, error);
      }
    }
  }

  console.log(`\n📊 Updated ${updated} pages`);
  await prisma.$disconnect();
}

updateImages();
