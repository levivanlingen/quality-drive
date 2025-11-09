import prisma from '../lib/prisma';
import { PageCategory } from '@prisma/client';

async function checkRijschoolImages() {
  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_AUTO,
      },
      select: {
        slug: true,
        title: true,
        featuredImage: true,
      },
      orderBy: {
        slug: 'asc',
      },
    });

    console.log('=== Rijschool Pages and Their Images ===\n');

    pages.forEach((page) => {
      console.log(`${page.slug}`);
      console.log(`  Title: ${page.title}`);
      console.log(`  Image: ${page.featuredImage || 'GEEN AFBEELDING'}`);
      console.log('');
    });

    console.log(`\nTotal pages: ${pages.length}`);
    const withImages = pages.filter(p => p.featuredImage).length;
    const withoutImages = pages.filter(p => !p.featuredImage).length;
    console.log(`Pages with images: ${withImages}`);
    console.log(`Pages without images: ${withoutImages}`);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkRijschoolImages();
