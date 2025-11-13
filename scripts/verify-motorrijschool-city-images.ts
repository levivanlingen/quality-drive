import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyMotorrijschoolCityImages() {
  console.log('🔍 Verificatie van motorrijschool stad-specifieke afbeeldingen...\n');
  console.log('='.repeat(80));

  const pages = await prisma.page.findMany({
    where: {
      category: PageCategory.RIJSCHOOL_MOTOR,
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

  console.log(`\nGevonden: ${pages.length} motorrijschool pagina's\n`);

  for (const page of pages) {
    const cityName = page.location?.name || 'Unknown';
    console.log(`\n📍 ${page.slug} (${cityName}):`);
    console.log('-'.repeat(80));
    console.log(`   Title: ${page.title}`);
    console.log(`   Featured Image: ${page.featuredImage || '(geen)'}`);
    console.log(`   Alt Text: ${page.featuredImageAlt || '(geen)'}`);

    // Check of dit een stad-gerelateerde afbeelding lijkt te zijn
    if (page.featuredImage) {
      const imageName = page.featuredImage.toLowerCase();
      const isCityRelated =
        imageName.includes('mauritshuis') ||
        imageName.includes('zoetermeer') ||
        imageName.includes('delft') ||
        imageName.includes('rijswijk') ||
        imageName.includes('voorburg') ||
        imageName.includes('nootdorp') ||
        imageName.includes('wateringen') ||
        imageName.includes('leidschenveen') ||
        imageName.includes('ypenburg') ||
        imageName.includes('lansingerland') ||
        imageName.includes('station') ||
        imageName.includes('entree') ||
        imageName.includes('dcmr') ||
        imageName.includes('hague');

      if (isCityRelated) {
        console.log(`   ✅ Lijkt stad-gerelateerde afbeelding te zijn`);
      } else {
        console.log(`   ⚠️  Mogelijk NIET stad-gerelateerd (motor/generic afbeelding?)`);
      }
    } else {
      console.log(`   ❌ GEEN featured image ingesteld`);
    }
  }

  console.log('\n');
  console.log('='.repeat(80));
  console.log('✅ Verificatie compleet');
  console.log('='.repeat(80));
  console.log('\n');
}

verifyMotorrijschoolCityImages()
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
