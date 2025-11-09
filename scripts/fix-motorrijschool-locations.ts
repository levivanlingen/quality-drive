import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://postgres:bHlnhxdXDICEwGSxJmeDuHQgoEdvqmPO@gondola.proxy.rlwy.net:57946/railway',
    },
  },
});

async function fixMotorrijschoolLocations() {
  console.log('\n🔧 MOTORRIJSCHOOL LOCATIES FIXEN\n');
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

  console.log('\nKoppelen van motorrijschool pagina\'s aan locaties...\n');

  let updated = 0;
  let notFound = 0;
  let alreadyLinked = 0;

  for (const cityName of motorCities) {
    const slug = `motorrijschool-${cityName.toLowerCase().replace(/\s+/g, '-')}`;

    // Find page
    const page = await prisma.page.findFirst({
      where: { slug },
      include: { location: true },
    });

    if (!page) {
      console.log(`❌ ${slug.padEnd(45)} - Pagina niet gevonden`);
      notFound++;
      continue;
    }

    // Check if already has location
    if (page.locationId) {
      console.log(`✅ ${slug.padEnd(45)} - Al gekoppeld aan ${page.location?.name}`);
      alreadyLinked++;
      continue;
    }

    // Find location
    const location = await prisma.location.findFirst({
      where: { name: cityName },
    });

    if (!location) {
      console.log(`⚠️  ${slug.padEnd(45)} - Locatie "${cityName}" niet gevonden in database`);
      notFound++;
      continue;
    }

    // Update page with locationId
    await prisma.page.update({
      where: { id: page.id },
      data: { locationId: location.id },
    });

    console.log(`🔗 ${slug.padEnd(45)} - Gekoppeld aan ${cityName}`);
    updated++;
  }

  console.log('\n' + '='.repeat(80));
  console.log('\n📊 RESULTAAT:\n');
  console.log(`Gekoppeld:     ${updated} pagina's 🔗`);
  console.log(`Al gekoppeld:  ${alreadyLinked} pagina's ✅`);
  console.log(`Niet gevonden: ${notFound} pagina's ❌`);
  console.log(`Totaal:        ${motorCities.length} pagina's`);

  if (updated > 0) {
    console.log('\n✅ Motorrijschool pagina\'s zijn nu gekoppeld aan hun locaties!');
    console.log('   De motorrijles pagina zal nu correct werken.');
  }

  await prisma.$disconnect();
}

fixMotorrijschoolLocations();
