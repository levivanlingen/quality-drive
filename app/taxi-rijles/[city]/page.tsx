import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { StartRijavontuurCTA, HeroSection } from '@/app/components/sections';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../../page.module.css';
import cityStyles from './city.module.css';
import contentStyles from '../content.module.css';
import { Car, Disc3 } from 'lucide-react';

// Generate static params for all taxi city pages
export async function generateStaticParams() {
  // Fallback for build time when DATABASE_URL might not be available
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found during build, skipping static generation');
    return [];
  }

  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_TAXI,
      },
      include: {
        location: true,
      },
    });

    return pages
      .filter(page => page.location)
      .map((page) => ({
        city: page.location!.slug,
      }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { city: string } }): Promise<Metadata> {
  const { city } = await params;

  const page = await prisma.page.findFirst({
    where: {
      category: PageCategory.RIJSCHOOL_TAXI,
      location: {
        slug: city,
      },
    },
    include: {
      location: true,
    },
  });

  if (!page) {
    return {
      title: 'Pagina niet gevonden',
    };
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `Taxi rijles in ${page.location?.name}`,
    keywords: page.seoKeywords,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || '',
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function TaxiRijlesCityPage({ params }: { params: { city: string } }) {
  const { city } = await params;

  // Fetch page data from database
  const page = await prisma.page.findFirst({
    where: {
      category: PageCategory.RIJSCHOOL_TAXI,
      location: {
        slug: city,
      },
    },
    include: {
      location: true,
    },
  });

  if (!page || !page.location) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <HeroSection
        label="Quality Drive Taxirijschool"
        title={page.title}
        subtitle={page.excerpt || undefined}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Taxi Rijles' },
          { label: page.location.name }
        ]}
      />

      {/* Content Section */}
      <section className={cityStyles.contentSection}>
        <div className={cityStyles.contentContainer}>
          <div
            className={contentStyles.contentHtml}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* CTA Section */}
      <StartRijavontuurCTA
        label="Begin vandaag nog"
        title={`Start vandaag nog met je taxirijbewijs in ${page.location.name}!`}
        text="Wij werken in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving. Plan je gratis proefles en start morgen al met taxirijlessen!"
        buttonText="Gratis proefles plannen"
        buttonLink="https://calendly.com/qualitydrive/30min"
      />

      <Footer />
    </div>
  );
}

// Enable static generation (ISR) - revalidate every hour
export const revalidate = 3600;
