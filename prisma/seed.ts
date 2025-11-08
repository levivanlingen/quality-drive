import { PrismaClient, PageCategory } from '@prisma/client';
import pagesData from '../data/pages.json';

const prisma = new PrismaClient();

// Helper: Extract city name from slug
function extractCityFromSlug(slug: string): string | null {
  const patterns = [
    /^rijschool-(.+)$/,
    /^taxi-rijles-(.+)$/,
    /^taxi-(.+)$/,
    /^motor-rijles-(.+)$/,
    /^automaat-rijles-(.+)$/,
  ];

  for (const pattern of patterns) {
    const match = slug.match(pattern);
    if (match) {
      return match[1];
    }
  }

  return null;
}

// Helper: Format city name (slug to proper name)
function formatCityName(citySlug: string): string {
  // Convert slugs like "den-haag" to "Den Haag"
  const cityMappings: Record<string, string> = {
    'den-haag': 'Den Haag',
    'zoetermeer': 'Zoetermeer',
    'delft': 'Delft',
    'rijswijk': 'Rijswijk',
    'voorburg': 'Voorburg',
    'nootdorp': 'Nootdorp',
    'berkel-en-rodenrijs': 'Berkel en Rodenrijs',
    'bergschenhoek': 'Bergschenhoek',
    'bleiswijk': 'Bleiswijk',
    'lansingerland': 'Lansingerland',
    'pijnacker': 'Pijnacker',
    'wateringen': 'Wateringen',
    'leidschendam': 'Leidschendam',
  };

  return cityMappings[citySlug] || citySlug.split('-').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

// Helper: Determine page category from slug
function determineCategory(slug: string): PageCategory {
  if (slug.startsWith('rijschool-')) return PageCategory.RIJSCHOOL_AUTO;
  if (slug.startsWith('taxi-')) return PageCategory.RIJSCHOOL_TAXI;
  if (slug.startsWith('motor-')) return PageCategory.RIJSCHOOL_MOTOR;
  if (slug.startsWith('automaat-')) return PageCategory.RIJSCHOOL_AUTOMAAT;
  if (slug.includes('theorie')) return PageCategory.THEORIE;
  if (slug.includes('blog') || slug.startsWith('post-')) return PageCategory.BLOG;
  if (slug === 'contact') return PageCategory.CONTACT;
  if (slug === 'about' || slug === 'over-ons') return PageCategory.ABOUT;
  return PageCategory.GENERAL;
}

async function main() {
  console.log('🌱 Starting seed...');

  // Clear existing data (optional - comment out if you want to keep existing data)
  console.log('🗑️  Clearing existing data...');
  await prisma.page.deleteMany();
  await prisma.location.deleteMany();

  // Extract unique cities
  console.log('📍 Creating locations...');
  const citySlugs = new Set<string>();

  for (const page of pagesData) {
    const citySlug = extractCityFromSlug(page.slug);
    if (citySlug) {
      citySlugs.add(citySlug);
    }
  }

  // Create locations
  const locationMap = new Map<string, number>();
  for (const citySlug of citySlugs) {
    const location = await prisma.location.create({
      data: {
        name: formatCityName(citySlug),
        slug: citySlug,
      },
    });
    locationMap.set(citySlug, location.id);
    console.log(`  ✓ Created location: ${location.name}`);
  }

  // Import pages
  console.log('\n📄 Importing pages...');
  let imported = 0;
  let skipped = 0;

  for (const page of pagesData) {
    try {
      const citySlug = extractCityFromSlug(page.slug);
      const locationId = citySlug ? locationMap.get(citySlug) : null;
      const category = determineCategory(page.slug);

      await prisma.page.create({
        data: {
          wordpressId: page.id,
          slug: page.slug,
          title: page.title,
          content: page.content || '',
          category: category,
          locationId: locationId || undefined,
          featuredImage: page.featuredImage,
          seoTitle: page.seo?.title || page.title,
          seoDescription: page.seo?.description || '',
          seoKeywords: page.seo?.keywords || '',
          originalUrl: page.originalUrl,
          publishedAt: page.date ? new Date(page.date) : null,
          parentId: page.parent || undefined,
        },
      });

      imported++;
      if (imported % 10 === 0) {
        console.log(`  ✓ Imported ${imported} pages...`);
      }
    } catch (error) {
      console.error(`  ✗ Error importing page "${page.slug}":`, error);
      skipped++;
    }
  }

  console.log(`\n✅ Seed completed!`);
  console.log(`   📄 Pages imported: ${imported}`);
  console.log(`   📍 Locations created: ${citySlugs.size}`);
  console.log(`   ⚠️  Pages skipped: ${skipped}`);

  // Print some stats
  const stats = await prisma.page.groupBy({
    by: ['category'],
    _count: true,
  });

  console.log('\n📊 Pages by category:');
  for (const stat of stats) {
    console.log(`   ${stat.category}: ${stat._count} pages`);
  }
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
