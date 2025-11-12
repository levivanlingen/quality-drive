import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, PopulairePakkettenSection, StartRijavontuurCTA } from '@/app/components/sections';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../../page.module.css';
import pakkettenStyles from './pakketten.module.css';
import IntroSection from './IntroSection';
import BannerSection from './BannerSection';
import ZekerhedenSection from './ZekerhedenSection';
import StepsSection from './StepsSection';
import WaromSection from './WaromSection';
import GeslaagdenSection from './GeslaagdenSection';
import FAQSection from './FAQSection';

// Generate static params for all motorrijschool pages
export async function generateStaticParams() {
  // Fallback slugs if database is not available (matching actual database entries)
  const fallbackSlugs = [
    'den-haag', 'zoetermeer', 'delft', 'rijswijk', 'voorburg',
    'nootdorp', 'wateringen', 'leidschenveen', 'ypenburg', 'lansingerland'
  ];

  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found during build, using fallback slugs');
    return fallbackSlugs.map(slug => ({ slug }));
  }

  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_MOTOR,
      },
      include: {
        location: true,
      },
    });

    if (pages.length === 0) {
      console.warn('⚠️  No motorrijschool pages found in database, using fallback slugs');
      return fallbackSlugs.map(slug => ({ slug }));
    }

    return pages.map((page) => ({
      // Strip "motorrijschool-" prefix from slug for URL
      slug: page.slug.replace(/^motorrijschool-/, ''),
    }));
  } catch (error) {
    console.error('Error generating static params for motorrijschool:', error);
    return fallbackSlugs.map(slug => ({ slug }));
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;

  const page = await prisma.page.findFirst({
    where: {
      slug: `motorrijschool-${slug}`,
      category: PageCategory.RIJSCHOOL_MOTOR,
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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl';
  const canonicalUrl = `${siteUrl}/motorrijschool-${slug}`;
  const locationName = page.location?.name || '';

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `Motorrijlessen ${locationName ? `in ${locationName}` : ''}. Professionele motorrijschool met ervaren instructeurs.`,
    keywords: page.seoKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || '',
      url: canonicalUrl,
      siteName: 'Quality Drive Rijschool',
      images: page.featuredImage ? [
        {
          url: page.featuredImage,
          width: 1200,
          height: 630,
          alt: `${page.title} - Quality Drive Motorrijschool`,
        }
      ] : [
        {
          url: `${siteUrl}/uploads/quality-drive-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Quality Drive Motorrijschool',
        }
      ],
      locale: 'nl_NL',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function MotorrijschoolPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Fetch page data from database (add motorrijschool- prefix to match database slug)
  const page = await prisma.page.findFirst({
    where: {
      slug: `motorrijschool-${slug}`,
      category: PageCategory.RIJSCHOOL_MOTOR,
    },
    select: {
      id: true,
      slug: true,
      title: true,
      content: true,
      excerpt: true,
      category: true,
      featuredImage: true,
      featuredImageAlt: true,
      seoTitle: true,
      seoDescription: true,
      seoKeywords: true,
      originalUrl: true,
      publishedAt: true,
      location: true,
    },
  });

  if (!page) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://quality-drive.nl';
  const locationName = page.location?.name || '';

  // Motor packages data
  const motorPackages = [
    {
      name: 'Spoed Pakket',
      price: 499,
      lessons: 10,
      savings: 59,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. €300',
        'AVB examen t.w.v. €225',
        'Gratis AVB her examen CBR t.w.v. €225',
        'Motorkleding inbegrepen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
    {
      name: 'Spoed Pakket+',
      price: 649,
      lessons: 15,
      savings: 75,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. €300',
        'AVB examen t.w.v. €225',
        'Gratis AVB her examen CBR t.w.v. €225',
        'Motorkleding inbegrepen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
    {
      name: 'Actie Pakket',
      price: 749,
      lessons: 20,
      savings: 83,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. €300',
        'AVB examen t.w.v. €225',
        'Gratis AVB her examen CBR t.w.v. €225',
        'Motorkleding inbegrepen',
        'Theorie ondersteuning',
      ],
      featured: true,
    },
    {
      name: 'Garantie Pakket',
      price: 949,
      lessons: 25,
      savings: 90,
      features: [
        'Gratis proefles',
        'Binnen 4 weken op examen CBR',
        'AVD Praktijk examen t.w.v. €300',
        'AVB examen t.w.v. €225',
        'Gratis AVB her examen CBR t.w.v. €225',
        'Motorkleding inbegrepen',
        'Theorie ondersteuning',
      ],
      featured: false,
    },
  ];

  // Structured Data - LocalBusiness Schema (only for city pages)
  const localBusinessSchema = page.location ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/motorrijschool-${slug}#organization`,
    name: `Quality Drive Motorrijschool ${locationName}`,
    image: page.featuredImage || `${siteUrl}/uploads/quality-drive-og.jpg`,
    description: page.seoDescription || `Motorrijlessen in ${locationName}`,
    url: `${siteUrl}/motorrijschool-${slug}`,
    telephone: '+31-70-123-4567',
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      addressLocality: locationName,
      addressRegion: 'Zuid-Holland',
      addressCountry: 'NL',
    },
  } : null;

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Motorrijles',
        item: `${siteUrl}/motorrijles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `${siteUrl}/motorrijschool-${slug}`,
      },
    ],
  };

  return (
    <>
      {/* Structured Data */}
      {localBusinessSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className={styles.page}>
        <Header />

        {/* Hero Section - Breadcrumbs en H1 */}
        <HeroSection
          title={page.title}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Motorrijles', href: '/motorrijles' },
            { label: locationName || page.title }
          ]}
        />

        {/* Intro Section - Main content */}
        <IntroSection
          cityName={locationName}
          image={page.featuredImage || undefined}
          imageAlt={page.featuredImageAlt || undefined}
        />

        {/* Banner Section - Special offer */}
        <BannerSection />

        {/* Zekerheden Section - 7 guarantees */}
        <ZekerhedenSection cityName={locationName} />

        {/* Steps Section - 4 steps to motorrijbewijs */}
        <StepsSection />

        {/* Warom Section - Why choose us */}
        <WaromSection cityName={locationName} />

        {/* Geslaagden Section - Successful students */}
        <GeslaagdenSection cityName={locationName} />

        {/* Motor Pakketten Section */}
        <div className={pakkettenStyles.motorPakketten}>
          <PopulairePakkettenSection
            title="Motor Rijles Pakketten"
            subtitle="Kies het pakket dat bij jou past en start vandaag nog"
            packages={motorPackages}
            buttonLink="https://calendly.com/quality-drive-info/motor"
            priceSuffix="2x"
          />
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Start Rijavontuur CTA */}
        <StartRijavontuurCTA
          title="Start jouw Rijavontuur bij Quality Drive!"
          buttonLink="https://calendly.com/quality-drive-info/motor"
          backgroundImage="/uploads/Eerste-lange-motorrit.jpg"
        />

        <Footer />
      </div>
    </>
  );
}

// Enable static generation (ISR) - revalidate every hour
export const revalidate = 3600;

// Allow dynamic params to be generated on-demand
export const dynamicParams = true;
