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

async function verifyAllImages() {
  console.log('🔍 Verificatie van alle rijschool afbeeldingen...\n');

  // Read pages.json for source verification
  const pagesJsonPath = path.join(process.cwd(), 'data', 'pages.json');
  const pagesData = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));

  // Get all rijschool pages from database
  const dbPages = await prisma.page.findMany({
    where: {
      slug: { startsWith: 'rijschool-' },
    },
    select: {
      slug: true,
      title: true,
      featuredImage: true,
      featuredImageAlt: true,
      location: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {
      slug: 'asc',
    },
  });

  console.log(`📊 Gevonden: ${dbPages.length} rijschool pagina's in database\n`);

  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  const availableFiles = fs.readdirSync(uploadsDir);

  let withImage = 0;
  let withoutImage = 0;
  let fileNotFound = 0;
  let correctAltText = 0;
  let missingAltText = 0;

  for (const page of dbPages) {
    const locationName = page.location?.name || '';
    const cityName = locationName || page.title.replace('Rijschool ', '');

    console.log(`\n${'='.repeat(60)}`);
    console.log(`📄 ${page.slug}`);
    console.log(`   Titel: ${page.title}`);
    console.log(`   Stad: ${cityName}`);

    if (page.featuredImage) {
      withImage++;

      // Check if file exists
      const filename = page.featuredImage.split('/').pop() || '';
      const fileExists = availableFiles.includes(filename);

      console.log(`   ✅ Featured Image: ${page.featuredImage}`);
      console.log(`   📂 Bestand bestaat: ${fileExists ? '✅ JA' : '❌ NEE'}`);

      if (!fileExists) {
        fileNotFound++;
      }

      // Check alt text
      if (page.featuredImageAlt) {
        correctAltText++;
        console.log(`   ✅ Alt tekst: "${page.featuredImageAlt.substring(0, 60)}${page.featuredImageAlt.length > 60 ? '...' : ''}"`);
      } else {
        missingAltText++;
        console.log(`   ⚠️  Alt tekst: ONTBREEKT`);
      }

      // Verify source from pages.json
      const sourcePageJson = pagesData.find((p: any) => p.slug === page.slug);
      if (sourcePageJson) {
        const content = sourcePageJson.content || '';
        const hasImageInContent = content.includes(filename.replace(/\.\w+$/, ''));

        console.log(`   📋 Bron pages.json: ${hasImageInContent ? '✅ Gevonden' : '⚠️  Niet gevonden'}`);
      } else {
        console.log(`   📋 Bron pages.json: ⚠️  Pagina niet gevonden in pages.json`);
      }

    } else {
      withoutImage++;
      console.log(`   ❌ Featured Image: ONTBREEKT`);
      console.log(`   ⚠️  Deze pagina heeft geen stadsfoto`);
    }
  }

  console.log(`\n${'='.repeat(60)}`);
  console.log('\n📊 SAMENVATTING:\n');
  console.log(`Totaal pagina's:           ${dbPages.length}`);
  console.log(`Met afbeelding:            ${withImage} ✅`);
  console.log(`Zonder afbeelding:         ${withoutImage} ${withoutImage > 0 ? '⚠️' : '✅'}`);
  console.log(`Bestand niet gevonden:     ${fileNotFound} ${fileNotFound > 0 ? '❌' : '✅'}`);
  console.log(`Met alt tekst:             ${correctAltText} ✅`);
  console.log(`Zonder alt tekst:          ${missingAltText} ${missingAltText > 0 ? '⚠️' : '✅'}`);

  if (withImage === dbPages.length - withoutImage && fileNotFound === 0 && missingAltText === 0) {
    console.log('\n🎉 PERFECT! Alle afbeeldingen hebben:');
    console.log('   ✅ Correcte paden');
    console.log('   ✅ Bestaande bestanden');
    console.log('   ✅ Alt teksten');
  } else {
    console.log('\n⚠️  Er zijn nog enkele issues:');
    if (withoutImage > 0) {
      console.log(`   - ${withoutImage} pagina's zonder stadsfoto`);
    }
    if (fileNotFound > 0) {
      console.log(`   - ${fileNotFound} afbeeldingen niet gevonden in /public/uploads/`);
    }
    if (missingAltText > 0) {
      console.log(`   - ${missingAltText} afbeeldingen zonder alt tekst`);
    }
  }

  await prisma.$disconnect();
}

verifyAllImages();
