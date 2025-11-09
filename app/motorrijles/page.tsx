import Link from 'next/link';
import { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, StartRijavontuurCTA } from '@/app/components/sections';
import prisma from '@/lib/prisma';
import { PageCategory } from '@prisma/client';
import styles from '../page.module.css';
import motorrijlesStyles from './motorrijles.module.css';
import { Bike, MapPin, Shield, Disc3 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Motorrijles in alle steden | Quality Drive Rijschool',
  description: 'Motorrijlessen in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving. Kies jouw stad en start met motorrijlessen bij Quality Drive.',
  keywords: 'motorrijles, motorrijschool, Den Haag, Zoetermeer, Delft, Rijswijk, motorrijlessen',
};

export default async function MotorrijlesPage() {
  // Selecteer de 10 motorsteden voor navigatie
  const mainCityNames = [
    'Den Haag',
    'Zoetermeer',
    'Delft',
    'Rijswijk',
    'Voorburg',
    'Nootdorp',
    'Lansingerland',
    'Wateringen',
    'Leidschenveen',
    'Ypenburg',
  ];

  // Haal de motorsteden op uit de database
  const cities = await prisma.page.findMany({
    where: {
      category: PageCategory.RIJSCHOOL_MOTOR,
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
    .slice(0, 10);

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Motorrijles"
        subtitle="Kies jouw stad en start met motorrijlessen"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Motorrijles' }
        ]}
      />

      {/* Cities Grid Section */}
      <section className={motorrijlesStyles.citiesSection}>
        <div className={motorrijlesStyles.citiesContainer}>
          <div className={motorrijlesStyles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>
              Motorrijles in {uniqueCities.length} steden
            </h2>
            <p className={styles.sectionHeaderSubtitle}>
              Selecteer jouw stad voor meer informatie
            </p>
          </div>

          <div className={motorrijlesStyles.citiesGrid}>
            {uniqueCities.map((city, index) => (
              <Link
                key={city.id}
                href={`/${city.slug}`}
                className={motorrijlesStyles.cityCard}
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <div className={motorrijlesStyles.cityIcon}>
                  <MapPin size={32} strokeWidth={1.5} />
                </div>
                <h3 className={motorrijlesStyles.cityTitle}>
                  {city.location!.name}
                </h3>
                <p className={motorrijlesStyles.cityDescription}>
                  Motorrijlessen in {city.location!.name}
                </p>
                <div className={motorrijlesStyles.cityArrow}>
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
      <section className={motorrijlesStyles.infoSection}>
        <div className={motorrijlesStyles.infoContainer}>
          <h2 className={motorrijlesStyles.infoTitle}>
            Motorrijlessen bij Quality Drive
          </h2>
          <div className={motorrijlesStyles.infoText}>
            <p>
              Bij Quality Drive bieden we professionele motorrijlessen in de regio Den Haag,
              Zoetermeer, Delft, Rijswijk en omgeving. Onze ervaren motorrijinstructeurs begeleiden
              je van de eerste motorrijles tot je motorrijexamen.
            </p>
            <p>
              We werken met moderne lesmotoren en een bewezen lesmethode die jou helpt om
              veilig en zelfverzekerd de weg op te gaan. Of je nu helemaal geen ervaring hebt
              of al wat rijervaring hebt opgedaan, wij passen onze lessen aan jouw niveau aan.
            </p>
          </div>

          <div className={motorrijlesStyles.featuresGrid}>
            <div className={motorrijlesStyles.featureCard}>
              <div className={motorrijlesStyles.featureIcon}>
                <Bike size={32} />
              </div>
              <h3 className={motorrijlesStyles.featureTitle}>Moderne Lesmotoren</h3>
              <p className={motorrijlesStyles.featureText}>
                Motorrijlessen op goed onderhouden, moderne motoren
              </p>
            </div>

            <div className={motorrijlesStyles.featureCard}>
              <div className={motorrijlesStyles.featureIcon}>
                <Shield size={32} />
              </div>
              <h3 className={motorrijlesStyles.featureTitle}>Ervaren Instructeurs</h3>
              <p className={motorrijlesStyles.featureText}>
                Professionele begeleiding door gecertificeerde motorrijinstructeurs
              </p>
            </div>

            <div className={motorrijlesStyles.featureCard}>
              <div className={motorrijlesStyles.featureIcon}>
                <MapPin size={32} />
              </div>
              <h3 className={motorrijlesStyles.featureTitle}>Lokale Kennis</h3>
              <p className={motorrijlesStyles.featureText}>
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
      <StartRijavontuurCTA />

      <Footer />
    </div>
  );
}

// Revalidate every hour
export const revalidate = 3600;
