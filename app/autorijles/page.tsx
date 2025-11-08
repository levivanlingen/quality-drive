import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../page.module.css';
import autorijlesStyles from './autorijles.module.css';
import { Car, MapPin, Shield, Disc3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Autorijles in alle steden | Quality Drive Rijschool',
  description: 'Autorijlessen in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving. Kies jouw stad en start met rijlessen bij Quality Drive.',
  keywords: 'autorijles, rijschool, Den Haag, Zoetermeer, Delft, Rijswijk, rijlessen',
};

export default async function AutorijlesPage() {
  // Selecteer de 9 belangrijkste steden voor navigatie
  const mainCityNames = [
    'Den Haag',
    'Zoetermeer',
    'Delft',
    'Rijswijk',
    'Voorburg',
    'Nootdorp',
    'Lansingerland',
    'Berkel en Rodenrijs',
    'Bergschenhoek',
  ];

  // Haal de belangrijkste steden op uit de database
  const cities = await prisma.page.findMany({
    where: {
      category: PageCategory.RIJSCHOOL_AUTO,
      locationId: { not: null },
      location: {
        name: {
          in: mainCityNames,
        },
      },
    },
    include: {
      location: true,
    },
    orderBy: {
      location: {
        name: 'asc',
      },
    },
  });

  // Filter unieke steden en sorteer op basis van de gewenste volgorde
  const uniqueCities = cities
    .filter((city, index, self) =>
      index === self.findIndex((c) => c.locationId === city.locationId)
    )
    .sort((a, b) => {
      const indexA = mainCityNames.indexOf(a.location!.name);
      const indexB = mainCityNames.indexOf(b.location!.name);
      return indexA - indexB;
    })
    .slice(0, 9);

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={autorijlesStyles.hero}>
        <div className={autorijlesStyles.heroContent}>
          {/* Breadcrumb */}
          <nav className={autorijlesStyles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={autorijlesStyles.breadcrumbSeparator}>/</span>
            <span>Autorijles</span>
          </nav>

          <h1 className={autorijlesStyles.heroTitle}>
            Autorijles
          </h1>
          <p className={autorijlesStyles.heroSubtitle}>
            Kies jouw stad en start met rijlessen
          </p>
        </div>
      </section>

      {/* Cities Grid Section */}
      <section className={autorijlesStyles.citiesSection}>
        <div className={autorijlesStyles.citiesContainer}>
          <div className={autorijlesStyles.sectionHeader}>
            <h2 className={autorijlesStyles.sectionTitle}>
              Autorijles in {uniqueCities.length} steden
            </h2>
            <p className={autorijlesStyles.sectionSubtitle}>
              Selecteer jouw stad voor meer informatie
            </p>
          </div>

          <div className={autorijlesStyles.citiesGrid}>
            {uniqueCities.map((city, index) => (
              <Link
                key={city.id}
                href={`/rijschool/${city.location!.slug}`}
                className={autorijlesStyles.cityCard}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className={autorijlesStyles.cityIcon}>
                  <MapPin size={32} strokeWidth={1.5} />
                </div>
                <h3 className={autorijlesStyles.cityTitle}>
                  {city.location!.name}
                </h3>
                <p className={autorijlesStyles.cityDescription}>
                  Autorijlessen in {city.location!.name}
                </p>
                <div className={autorijlesStyles.cityArrow}>
                  →
                </div>
              </Link>
            ))}
          </div>
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

      {/* Info Section */}
      <section className={autorijlesStyles.infoSection}>
        <div className={autorijlesStyles.infoContainer}>
          <h2 className={autorijlesStyles.infoTitle}>
            Autorijlessen bij Quality Drive
          </h2>
          <div className={autorijlesStyles.infoText}>
            <p>
              Bij Quality Drive bieden we professionele autorijlessen in de regio Den Haag,
              Zoetermeer, Delft, Rijswijk en omgeving. Onze ervaren rijinstructeurs begeleiden
              je van de eerste rijles tot je rijexamen.
            </p>
            <p>
              We werken met moderne lesauto's en een bewezen lesmethode die jou helpt om
              veilig en zelfverzekerd de weg op te gaan. Of je nu helemaal geen ervaring hebt
              of al wat rijervaring hebt opgedaan, wij passen onze lessen aan jouw niveau aan.
            </p>
          </div>

          <div className={autorijlesStyles.featuresGrid}>
            <div className={autorijlesStyles.featureCard}>
              <div className={autorijlesStyles.featureIcon}>
                <Car size={32} />
              </div>
              <h3 className={autorijlesStyles.featureTitle}>Moderne Lesauto's</h3>
              <p className={autorijlesStyles.featureText}>
                Rijlessen in goed onderhouden, moderne auto's
              </p>
            </div>

            <div className={autorijlesStyles.featureCard}>
              <div className={autorijlesStyles.featureIcon}>
                <Shield size={32} />
              </div>
              <h3 className={autorijlesStyles.featureTitle}>Ervaren Instructeurs</h3>
              <p className={autorijlesStyles.featureText}>
                Professionele begeleiding door gecertificeerde rijinstructeurs
              </p>
            </div>

            <div className={autorijlesStyles.featureCard}>
              <div className={autorijlesStyles.featureIcon}>
                <MapPin size={32} />
              </div>
              <h3 className={autorijlesStyles.featureTitle}>Lokale Kennis</h3>
              <p className={autorijlesStyles.featureText}>
                Instructeurs met uitstekende kennis van jouw regio
              </p>
            </div>
          </div>
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
      <section className={autorijlesStyles.ctaSection}>
        <div className={autorijlesStyles.ctaContainer}>
          <div className={autorijlesStyles.ctaContent}>
            <p className={autorijlesStyles.ctaLabel}>Begin vandaag nog</p>
            <h2 className={autorijlesStyles.ctaTitle}>
              Start jouw Rijavontuur bij Quality Drive!
            </h2>
            <p className={autorijlesStyles.ctaText}>
              Kies hierboven jouw stad en ontdek wat Quality Drive voor jou kan betekenen.
              Wij werken in <strong>Den Haag, Zoetermeer, Delft, Rijswijk</strong> en omgeving.
            </p>
            <p className={autorijlesStyles.ctaText}>
              Als je vragen hebt kun je geheel vrijblijvend contact met ons opnemen,
              we helpen je graag verder.
            </p>

            <div className={autorijlesStyles.guaranteeSection}>
              <h3 className={autorijlesStyles.guaranteeTitle}>
                <Shield size={28} />
                Onze Zekerheid aan jou
              </h3>
              <p className={autorijlesStyles.guaranteeText}>
                Bij Quality Drive zorgen we ervoor dat je met zekerheid jouw rijbewijs haalt.
                Wij bieden niet alleen uitstekende rijlessen, maar ook de garantie dat je goed
                voorbereid en vol vertrouwen je rijexamen aflegt.
              </p>
            </div>

            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={autorijlesStyles.ctaButton}
            >
              <Car size={20} />
              Gratis proefles plannen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// Revalidate every hour
export const revalidate = 3600;
