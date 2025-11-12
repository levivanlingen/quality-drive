import { PrismaClient, PageCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function testPageLoad() {
  console.log('🧪 Testing page load for Den Haag...\n');

  const slug = 'den-haag';

  const page = await prisma.page.findFirst({
    where: {
      slug: `motorrijschool-${slug}`,
      category: PageCategory.RIJSCHOOL_MOTOR,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      featuredImage: true,
      featuredImageAlt: true,
      location: true,
    },
  });

  console.log('Page data:', JSON.stringify(page, null, 2));

  if (page) {
    console.log('\n✅ Page found');
    console.log(`Featured Image: ${page.featuredImage || 'NULL'}`);
    console.log(`Featured Image Alt: ${page.featuredImageAlt || 'NULL'}`);
    console.log(`Location: ${page.location?.name || 'NULL'}`);
  } else {
    console.log('\n❌ Page not found');
  }
}

testPageLoad()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
