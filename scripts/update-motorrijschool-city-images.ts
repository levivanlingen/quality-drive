import { PrismaClient, PageCategory } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

// Stad-specifieke afbeeldingen uit pages.json (WordPress URLs)
const wordpressUrls: Record<string, string> = {
  'motorrijschool-den-haag': 'https://quality-drive.nl/wp-content/uploads/2024/05/museum-mauritshuis-in-the-hague-byjoniisraeli-1200-768x512.jpg',
  'motorrijschool-zoetermeer': 'https://quality-drive.nl/wp-content/uploads/2024/05/Zoetermeer-Neth-768x448.webp',
  'motorrijschool-delft': 'https://quality-drive.nl/wp-content/uploads/2024/05/Delft_shutterstock_581347357-768x432.jpg',
  'motorrijschool-rijswijk': 'https://quality-drive.nl/wp-content/uploads/2024/08/Station_Rijswijk_piramide_2005-768x576.jpg',
  'motorrijschool-voorburg': 'https://quality-drive.nl/wp-content/uploads/2024/05/9ba83056-7275-43bf-8513-c863a7e8e646-768x576.jpeg',
  'motorrijschool-nootdorp': 'https://quality-drive.nl/wp-content/uploads/2024/05/PN-entree-768x317.jpg',
  'motorrijschool-wateringen': 'https://quality-drive.nl/wp-content/uploads/2024/08/wateringen-via-google-streetview2-768x439.webp',
  'motorrijschool-leidschenveen': 'https://quality-drive.nl/wp-content/uploads/2024/08/131411232_3658396434221860_8452838713219462914_n-768x513.jpg',
  'motorrijschool-ypenburg': 'https://quality-drive.nl/wp-content/uploads/2024/08/the-hague-ypenburg-1-768x543.jpeg',
  'motorrijschool-lansingerland': 'https://quality-drive.nl/wp-content/uploads/2024/08/DCMR-Lansingerland-5-2-768x512.jpg',
};

// Functie om WordPress URL om te zetten naar lokale path
function wpUrlToLocalPath(wpUrl: string): string | null {
  // Extract filename from WordPress URL (remove size suffix if present)
  const match = wpUrl.match(/uploads\/\d{4}\/\d{2}\/([^\/]+?)(?:-\d+x\d+)?\.(\w+)$/);
  if (!match) {
    console.log(`   ⚠️  Kan filename niet extraheren uit: ${wpUrl}`);
    return null;
  }

  const baseFilename = match[1];
  const extension = match[2];

  // Zoek in public/uploads naar bestand met deze naam (met verschillende extensies)
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const possibleExtensions = ['webp', 'jpg', 'jpeg', 'png', extension];

  for (const ext of possibleExtensions) {
    const filename = `${baseFilename}.${ext}`;
    const fullPath = path.join(uploadsDir, filename);

    if (fs.existsSync(fullPath)) {
      console.log(`   ✅ Gevonden: ${filename}`);
      return `/uploads/${filename}`;
    }
  }

  console.log(`   ❌ Niet gevonden in /uploads/: ${baseFilename}.{${possibleExtensions.join(',')}}`);
  return null;
}

async function updateMotorrijschoolCityImages() {
  console.log('🏙️  Updating motorrijschool stad-specifieke afbeeldingen uit pages.json...\n');
  console.log('='.repeat(80));

  const results: { slug: string; success: boolean; image?: string; error?: string }[] = [];

  for (const [slug, wpUrl] of Object.entries(wordpressUrls)) {
    console.log(`\n📍 ${slug}:`);
    console.log(`   WordPress URL: ${wpUrl}`);

    // Converteer naar lokale path
    const localPath = wpUrlToLocalPath(wpUrl);

    if (!localPath) {
      results.push({ slug, success: false, error: 'Bestand niet gevonden' });
      continue;
    }

    // Update database
    try {
      const cityName = slug
        .replace('motorrijschool-', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

      const result = await prisma.page.updateMany({
        where: {
          slug: slug,
          category: PageCategory.RIJSCHOOL_MOTOR,
        },
        data: {
          featuredImage: localPath,
          featuredImageAlt: `Motorrijschool ${cityName} - Quality Drive motorrijlessen in ${cityName}`,
        },
      });

      if (result.count > 0) {
        console.log(`   ✅ Database updated`);
        console.log(`   Image: ${localPath}`);
        results.push({ slug, success: true, image: localPath });
      } else {
        console.log(`   ⚠️  Pagina niet gevonden in database`);
        results.push({ slug, success: false, error: 'Pagina niet in database' });
      }
    } catch (error) {
      console.error(`   ❌ Database error:`, error);
      results.push({ slug, success: false, error: String(error) });
    }
  }

  // Samenvatting
  console.log('\n');
  console.log('='.repeat(80));
  console.log('📊 SAMENVATTING');
  console.log('='.repeat(80));

  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);

  console.log(`\nTotaal steden: ${results.length}`);
  console.log(`✅ Succesvol: ${successful.length}`);
  console.log(`❌ Gefaald: ${failed.length}`);

  if (failed.length > 0) {
    console.log('\n❌ GEFAALDE UPDATES:');
    failed.forEach((f, i) => {
      console.log(`  ${i + 1}. ${f.slug}: ${f.error}`);
    });
  }

  if (successful.length === results.length) {
    console.log('\n🎉 PERFECT! Alle stad-specifieke afbeeldingen zijn correct geüpdatet!');
  }

  console.log('\n');
}

updateMotorrijschoolCityImages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
