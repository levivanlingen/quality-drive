import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function fixMotorrijschoolCategories() {
  console.log('🔧 Fixing motorrijschool page categories...\n');

  // Update all motorrijschool pages to RIJSCHOOL_MOTOR category
  const motorrijschoolSlugs = [
    'motorrijschool-den-haag',
    'motorrijschool-zoetermeer',
    'motorrijschool-delft',
    'motorrijschool-rijswijk',
    'motorrijschool-voorburg',
    'motorrijschool-nootdorp',
    'motorrijschool-wateringen',
    'motorrijschool-leidschenveen',
    'motorrijschool-ypenburg',
    'motorrijschool-lansingerland',
  ];

  for (const slug of motorrijschoolSlugs) {
    try {
      const result = await prisma.page.updateMany({
        where: {
          slug: slug,
        },
        data: {
          category: PageCategory.RIJSCHOOL_MOTOR,
        },
      });

      if (result.count > 0) {
        console.log(`✅ Updated category for: ${slug}`);
      } else {
        console.log(`⚠️  Not found: ${slug}`);
      }
    } catch (error) {
      console.error(`❌ Error updating ${slug}:`, error);
    }
  }

  console.log('\n✅ Done fixing categories!');
}

fixMotorrijschoolCategories()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
