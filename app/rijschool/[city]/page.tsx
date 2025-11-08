import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../../page.module.css';

// Generate static params for all rijschool city pages
export async function generateStaticParams() {
  // Fallback for build time when DATABASE_URL might not be available
  if (!process.env.DATABASE_URL) {
    console.warn('⚠️  DATABASE_URL not found during build, skipping static generation');
    return [];
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
      category: PageCategory.RIJSCHOOL_AUTO,
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
    description: page.seoDescription || `Rijschool in ${page.location?.name}`,
    keywords: page.seoKeywords,
    openGraph: {
      title: page.seoTitle || page.title,
      description: page.seoDescription || '',
      images: page.featuredImage ? [page.featuredImage] : [],
    },
  };
}

export default async function RijschoolCityPage({ params }: { params: { city: string } }) {
  const { city } = await params;

  // Fetch page data from database
  const page = await prisma.page.findFirst({
    where: {
      category: PageCategory.RIJSCHOOL_AUTO,
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
      <section style={{
        background: 'linear-gradient(135deg, #0065A6 0%, #004d7a 100%)',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          color: 'white',
        }}>
          <nav style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '0.875rem',
            marginBottom: '2rem',
          }}>
            <a href="/" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'none' }}>Home</a>
            <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>/</span>
            <span>{page.location.name}</span>
          </nav>

          <h1 style={{
            fontSize: '4rem',
            fontWeight: 900,
            marginBottom: 0,
            lineHeight: 1.1,
            textShadow: '0 4px 30px rgba(0, 0, 0, 0.3)',
            letterSpacing: '-0.02em',
          }}>
            {page.title}
          </h1>
        </div>
      </section>

      {/* Content Section */}
      <section style={{
        padding: '6rem 2rem',
        background: 'linear-gradient(180deg, #f8f9fa 0%, #ffffff 100%)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}>
          {/* Render HTML content safely */}
          <div
            style={{
              fontSize: '1.125rem',
              color: '#4a5568',
              lineHeight: 1.8,
            }}
            dangerouslySetInnerHTML={{ __html: page.content }}
          />
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '6rem 2rem',
        backgroundImage: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url("/uploads/Night-Driving-CarBaba-1.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
        }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.85) 100%)',
            backdropFilter: 'blur(30px) saturate(200%)',
            borderRadius: '32px',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            width: '100%',
          }}>
            <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '1rem' }}>
              Start vandaag nog in {page.location.name}!
            </h2>
            <p style={{ marginBottom: '2rem', color: '#4a5568' }}>
              Wij werken in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving.
            </p>
            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'linear-gradient(135deg, #C11517 0%, #a00f11 100%)',
                color: 'white',
                padding: '1rem 2rem',
                borderRadius: '16px',
                fontSize: '1rem',
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(193, 21, 23, 0.3)',
              }}
            >
              Gratis proefles plannen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Enable static generation (ISR) - revalidate every hour
export const revalidate = 3600;
