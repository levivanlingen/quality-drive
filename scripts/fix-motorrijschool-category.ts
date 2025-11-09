import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function fixMotorrijschoolCategory() {
  console.log('\n🔧 MOTORRIJSCHOOL CATEGORY FIXEN\n');
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

  console.log('\nZoeken naar motorrijschool pagina\'s met verkeerde category...\n');

  let updated = 0;
  let notFound = 0;

  for (const cityName of motorCities) {
    const slug = `motorrijschool-${cityName.toLowerCase().replace(/\s+/g, '-')}`;

    // Find page regardless of category
    const page = await prisma.page.findFirst({
      where: { slug },
    });

    if (!page) {
      console.log(`❌ ${slug.padEnd(45)} - Niet gevonden`);
      notFound++;
      continue;
    }

    // Check current category
    if (page.category === PageCategory.RIJSCHOOL_MOTOR) {
      console.log(`✅ ${slug.padEnd(45)} - Al correct (${page.category})`);
      continue;
    }

    // Update category
    await prisma.page.update({
      where: { id: page.id },
      data: { category: PageCategory.RIJSCHOOL_MOTOR },
    });

    console.log(`🔄 ${slug.padEnd(45)} - Geüpdatet van ${page.category} → RIJSCHOOL_MOTOR`);
    updated++;
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESULTAAT:\n');
  console.log(`Geüpdatet:   ${updated} pagina's 🔄`);
  console.log(`Al correct:  ${motorCities.length - updated - notFound} pagina's ✅`);
  console.log(`Niet gevonden: ${notFound} pagina's ❌`);
  console.log(`Totaal:      ${motorCities.length} pagina's`);

  if (updated > 0) {
    console.log('\n✅ Motorrijschool pagina\'s hebben nu de correcte category!');
  }

  await prisma.$disconnect();
}

fixMotorrijschoolCategory();
