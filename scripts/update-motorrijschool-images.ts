import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Mapping van stad naar featured image (stad-specifieke afbeeldingen uit uploads)
const cityImageMapping: Record<string, { image: string; alt: string }> = {
  'motorrijschool-den-haag': {
    image: '/uploads/85468_fullimage_wandelaars-op-het-plein-met-op-de-achtergrond-de-skyline-van-den-haag-©-jurjen-drenth-via-the-hague-partners.webp',
    alt: 'Motorrijschool Den Haag - Quality Drive motorrijlessen in Den Haag',
  },
  'motorrijschool-zoetermeer': {
    image: '/uploads/ANWB-Rijopleiding-Motorrijles-shoot-2021-14.webp',
    alt: 'Motorrijschool Zoetermeer - Quality Drive motorrijlessen in Zoetermeer',
  },
  'motorrijschool-delft': {
    image: '/uploads/Delft_shutterstock_581347357.webp',
    alt: 'Motorrijschool Delft - Quality Drive motorrijlessen in Delft',
  },
  'motorrijschool-rijswijk': {
    image: '/uploads/27352_fullimage_rijswijk-211114.webp',
    alt: 'Motorrijschool Rijswijk - Quality Drive motorrijlessen in Rijswijk',
  },
  'motorrijschool-voorburg': {
    image: '/uploads/Het-Sluisje-van-Leidschendam-Voorburg-foto-Sake-Witteveen.webp',
    alt: 'Motorrijschool Voorburg - Quality Drive motorrijlessen in Voorburg',
  },
  'motorrijschool-nootdorp': {
    image: '/uploads/nootdorp.webp',
    alt: 'Motorrijschool Nootdorp - Quality Drive motorrijlessen in Nootdorp',
  },
  'motorrijschool-wateringen': {
    image: '/uploads/Eerste-lange-motorrit.jpg',
    alt: 'Motorrijschool Wateringen - Quality Drive motorrijlessen in Wateringen',
  },
  'motorrijschool-leidschenveen': {
    image: '/uploads/Header-3000-ANWB-Rijopleiding-Motor-4-3000-px.webp',
    alt: 'Motorrijschool Leidschenveen - Quality Drive motorrijlessen in Leidschenveen',
  },
  'motorrijschool-ypenburg': {
    image: '/uploads/Bax-opleidingen-motor-rijbewijs-tilburg-denbosch_20240626165109577.webp',
    alt: 'Motorrijschool Ypenburg - Quality Drive motorrijlessen in Ypenburg',
  },
  'motorrijschool-lansingerland': {
    image: '/uploads/Autorijschool-Motorrijschool-Les4You-Breda-Verkeer-006.webp',
    alt: 'Motorrijschool Lansingerland - Quality Drive motorrijlessen in Lansingerland',
  },
};

async function updateMotorrijschoolImages() {
  console.log('🏍️  Updating motorrijschool featured images...\n');

  for (const [slug, data] of Object.entries(cityImageMapping)) {
    try {
      const result = await prisma.page.updateMany({
        where: {
          slug: slug,
          category: PageCategory.RIJSCHOOL_MOTOR,
        },
        data: {
          featuredImage: data.image,
          featuredImageAlt: data.alt,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated ${slug}`);
        console.log(`   Image: ${data.image}`);
        console.log(`   Alt: ${data.alt}\n`);
      } else {
        console.log(`⚠️  Not found: ${slug}\n`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
    }
  }

  console.log('\n✅ Done updating motorrijschool images!');
}

updateMotorrijschoolImages()
  .catch((error) => {
    console.error('Error:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
