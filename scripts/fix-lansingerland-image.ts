import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function fixLansingerland() {
  console.log('🔧 Fixing Lansingerland featured image...\n');

  const result = await prisma.page.updateMany({
    where: {
      slug: 'motorrijschool-lansingerland',
      category: PageCategory.RIJSCHOOL_MOTOR,
    },
    data: {
      featuredImage: '/uploads/2024/08/DCMR-Lansingerland-5-2-768x512.jpg',
      featuredImageAlt: 'Motorrijschool Lansingerland',
    },
  });

  if (result.count > 0) {
    console.log('✅ Updated motorrijschool-lansingerland');
    console.log('   Image: /uploads/2024/08/DCMR-Lansingerland-5-2-768x512.jpg');
    console.log('   Alt: Motorrijschool Lansingerland');
  } else {
    console.log('⚠️  Not found');
  }
}

fixLansingerland()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
