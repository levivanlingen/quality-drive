import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Disc3, Shield, Car } from 'lucide-react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { StartRijavontuurCTA, HeroSection } from '@/app/components/sections';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../../page.module.css';
import cityStyles from './city.module.css';
import StepsSection from './StepsSection';
import ContentSections from './ContentSections';
import PakkettenSection from './PakkettenSection';

// Generate static params for all rijschool pages (except automaat, motor, taxi)
export async function generateStaticParams() {
  // Fallback slugs if database is not available
  const fallbackSlugs = [
    'den-haag', 'zoetermeer', 'delft', 'rijswijk', 'voorburg', 'nootdorp',
    'berkel-en-rodenrijs', 'bergschenhoek', 'bleiswijk', 'lansingerland',
    'pijnacker', 'wateringen', 'leidschendam',
    'adhd', 'faalangst', 'add'
  ];

  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found during build, using fallback slugs');
    return fallbackSlugs.map(slug => ({ slug }));
  }

  try {
    const pages = await prisma.page.findMany({
      where: {
        category: PageCategory.RIJSCHOOL_AUTO,
      },
      include: {
        location: true,
      },
    });

    if (pages.length === 0) {
      console.warn('⚠️  No pages found in database, using fallback slugs');
      return fallbackSlugs.map(slug => ({ slug }));
    }

    return pages.map((page) => ({
      // Strip "rijschool-" prefix from slug for URL
      slug: page.slug.replace(/^rijschool-/, ''),
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return fallbackSlugs.map(slug => ({ slug }));
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = await params;

  const page = await prisma.page.findFirst({
    where: {
      slug: `rijschool-${slug}`,
      category: PageCategory.RIJSCHOOL_AUTO,
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
  const canonicalUrl = `${siteUrl}/rijschool-${slug}`;
  const locationName = page.location?.name || '';

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || `Autorijlessen ${locationName ? `in ${locationName}` : ''}. Professionele rijschool met ervaren instructeurs.`,
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
          alt: `${page.title} - Quality Drive Rijschool`,
        }
      ] : [
        {
          url: `${siteUrl}/uploads/quality-drive-og.jpg`,
          width: 1200,
          height: 630,
          alt: 'Quality Drive Rijschool',
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

export default async function RijschoolPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;

  // Fetch page data from database (add rijschool- prefix to match database slug)
  const page = await prisma.page.findFirst({
    where: {
      slug: `rijschool-${slug}`,
      category: PageCategory.RIJSCHOOL_AUTO,
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

  // Structured Data - LocalBusiness Schema (only for city pages)
  const localBusinessSchema = page.location ? {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}/rijschool-${slug}#organization`,
    name: `Quality Drive Rijschool ${locationName}`,
    image: page.featuredImage || `${siteUrl}/uploads/quality-drive-og.jpg`,
    description: page.seoDescription || `Autorijlessen in ${locationName}`,
    url: `${siteUrl}/rijschool-${slug}`,
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
        name: 'Autorijles',
        item: `${siteUrl}/autorijles`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: page.title,
        item: `${siteUrl}/rijschool-${slug}`,
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
            { label: 'Autorijles', href: '/autorijles' },
            { label: locationName || page.title }
          ]}
        />

        {/* Steps Section with Animated Car */}
        <StepsSection />

        {/* Content Section */}
        <section className={cityStyles.contentSection}>
          <div className={cityStyles.contentContainer}>
            <div className={cityStyles.contentGrid}>
              {/* Left: Image */}
              <div className={cityStyles.imageColumn}>
                <h2 className={cityStyles.imageTitle}>
                  Beste goedkope rijschool {locationName ? `${locationName} en omgeving` : ''}
                </h2>
                <img
                  src="/uploads/pexels-element-digital-1051071-scaled.webp"
                  alt={`Beste goedkope rijschool ${locationName ? `${locationName} en omgeving` : ''}`}
                  className={cityStyles.contentImage}
                />
              </div>

              {/* Right: Features */}
              <div className={cityStyles.featuresColumn}>
                <p className={cityStyles.featuresLabel}>Van Starter tot Pro</p>
                <h2 className={cityStyles.featuresTitle}>De 6 zekerheden alleen bij Quality Drive</h2>

                <ul className={cityStyles.featuresList}>
                  <li className={cityStyles.featureItem}>Gratis proefles</li>
                  <li className={cityStyles.featureItem}>€ 7,50 korting per rijles</li>
                  <li className={cityStyles.featureItem}>Morgen starten met je rijles</li>
                  <li className={cityStyles.featureItem}>Succesvolle lesmethode</li>
                  <li className={cityStyles.featureItem}>Beoordeling rijinstructeurs 9.1</li>
                  <li className={cityStyles.featureItem}>Theorie ondersteuning tijdens je les</li>
                </ul>

                <div className={cityStyles.ctaButtons}>
                  <a
                    href="https://calendly.com/qualitydrive/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cityStyles.rijschoolButton}
                  >
                    Gratis proefles inplannen
                  </a>
                  <a
                    href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cityStyles.whatsappButton}
                    aria-label="Contact via WhatsApp"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className={cityStyles.statsGrid}>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>356</div>
                <div className={cityStyles.statLabel}>Geslaagde leerlingen</div>
              </div>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>13</div>
                <div className={cityStyles.statLabel}>Expert rijinstructeurs</div>
              </div>
              <div className={cityStyles.statCard}>
                <div className={cityStyles.statNumber}>100<span className={cityStyles.statPercent}>%</span></div>
                <div className={cityStyles.statLabel}>Tevreden leerlingen</div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ and Why Quality Drive Sections */}
        <ContentSections
          cityName={locationName || page.title}
          cityImage={page.featuredImage}
          cityImageAlt={page.featuredImageAlt}
          slug={page.slug}
        />

        {/* Section Divider */}
        <div className={styles.sectionDivider}>
          <div className={styles.dividerLine}></div>
          <div className={styles.dividerIcon}>
            <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
          </div>
          <div className={styles.dividerLine}></div>
        </div>

        {/* Populaire Pakketten Section */}
        <PakkettenSection />

        {/* CTA Section */}
        <StartRijavontuurCTA />

        <Footer />
      </div>
    </>
  );
}

// Enable static generation (ISR) - revalidate every hour
export const revalidate = 3600;

// Allow dynamic params to be generated on-demand
export const dynamicParams = true;
