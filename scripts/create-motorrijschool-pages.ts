import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function createMotorrijschoolPages() {
  console.log('\n🏍️  MOTORRIJSCHOOL PAGINA\'S AANMAKEN\n');
  console.log('='.repeat(80));

  const motorCities = [
    'Den Haag',
    'Zoetermeer',
    'Delft',
    'Rijswijk',
    'Voorburg',
    'Nootdorp',
    'Lansingerland',
    'Wateringen',
    'Leidschenveen',
    'Ypenburg',
  ];

  console.log(`\nAanmaken van ${motorCities.length} motorrijschool pagina's...\n`);

  let created = 0;
  let skipped = 0;

  for (const cityName of motorCities) {
    const slug = `motorrijschool-${cityName.toLowerCase().replace(/\s+/g, '-')}`;

    // Check if location exists
    let location = await prisma.location.findFirst({
      where: { name: cityName },
    });

    if (!location) {
      console.log(`⚠️  Locatie "${cityName}" niet gevonden in database, overslaan...`);
      skipped++;
      continue;
    }

    // Check if page already exists
    const existingPage = await prisma.page.findFirst({
      where: { slug },
    });

    if (existingPage) {
      console.log(`⏭️  ${slug.padEnd(45)} - Al aanwezig`);
      skipped++;
      continue;
    }

    // Create page
    const page = await prisma.page.create({
      data: {
        slug,
        title: `Motorrijschool ${cityName}`,
        content: `Motorrijlessen in ${cityName} bij Quality Drive Rijschool. Professionele motorrijles met ervaren instructeurs.`,
        excerpt: `Motorrijles in ${cityName} - Quality Drive`,
        category: PageCategory.RIJSCHOOL_MOTOR,
        locationId: location.id,
        seoTitle: `Motorrijschool ${cityName} | Quality Drive`,
        seoDescription: `Motorrijlessen in ${cityName}. Professionele motorrijschool met ervaren instructeurs. Start vandaag nog met je motorrijbewijs bij Quality Drive.`,
        seoKeywords: `motorrijschool ${cityName}, motorrijles ${cityName}, motorrijbewijs ${cityName}`,
        publishedAt: new Date(),
      },
    });

    console.log(`✅ ${slug.padEnd(45)} - Aangemaakt`);
    created++;
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESULTAAT:\n');
  console.log(`Aangemaakt:  ${created} pagina's ✅`);
  console.log(`Overgeslagen: ${skipped} pagina's`);
  console.log(`Totaal:      ${motorCities.length} pagina's`);

  if (created > 0) {
    console.log('\n✅ De motorrijles pagina zal nu correct werken met alle steden!');
    console.log('   URL: /motorrijles');
  }

  await prisma.$disconnect();
}

createMotorrijschoolPages();
