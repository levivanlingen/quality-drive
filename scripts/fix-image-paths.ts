import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

// Correct image paths that actually exist in /uploads/
const correctImagePaths: Record<string, { image: string; alt: string }> = {
  'motorrijschool-den-haag': {
    image: '/uploads/museum-mauritshuis-in-the-hague-byjoniisraeli-1200.webp',
    alt: 'Motorrijschool Den Haag - Quality Drive',
  },
  'motorrijschool-zoetermeer': {
    image: '/uploads/Zoetermeer-Neth.webp',
    alt: 'Motorrijschool Zoetermeer - Quality Drive',
  },
  'motorrijschool-delft': {
    image: '/uploads/Delft_shutterstock_581347357.webp',
    alt: 'Motorrijschool Delft - Quality Drive',
  },
  'motorrijschool-rijswijk': {
    image: '/uploads/27352_fullimage_rijswijk-211114.webp',
    alt: 'Motorrijschool Rijswijk - Quality Drive',
  },
  'motorrijschool-voorburg': {
    image: '/uploads/Het-Sluisje-van-Leidschendam-Voorburg-foto-Sake-Witteveen.webp',
    alt: 'Motorrijschool Voorburg - Quality Drive',
  },
  'motorrijschool-nootdorp': {
    image: '/uploads/nootdorp.webp',
    alt: 'Motorrijschool Nootdorp - Quality Drive',
  },
  'motorrijschool-wateringen': {
    image: '/uploads/wateringen-via-google-streetview2.webp',
    alt: 'Motorrijschool Wateringen - Quality Drive',
  },
  'motorrijschool-leidschenveen': {
    image: '/uploads/131411232_3658396434221860_8452838713219462914_n.jpg',
    alt: 'Motorrijschool Leidschenveen - Quality Drive',
  },
  'motorrijschool-ypenburg': {
    image: '/uploads/the-hague-ypenburg-1.jpeg',
    alt: 'Motorrijschool Ypenburg - Quality Drive',
  },
  'motorrijschool-lansingerland': {
    image: '/uploads/DCMR-Lansingerland-5-2.jpg',
    alt: 'Motorrijschool Lansingerland - Quality Drive',
  },
};

async function fixImagePaths() {
  console.log('🔧 Fixing image paths to match actual files...\n');

  for (const [slug, data] of Object.entries(correctImagePaths)) {
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
        console.log(`✅ ${slug}`);
        console.log(`   → ${data.image}\n`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
    }
  }

  console.log('✅ Done!');
}

fixImagePaths()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
