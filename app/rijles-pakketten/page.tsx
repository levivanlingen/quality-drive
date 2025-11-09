'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection } from '@/app/components/sections';
import { StartRijavontuurCTA } from '@/app/components/sections/StartRijavontuurCTA';
import styles from '../page.module.css';
import pakkettenStyles from './pakketten.module.css';
import { Car, Bike, Check, Disc3 } from 'lucide-react';

export default function RijlesPakkettenPage() {
  const packages = [
    {
      id: 'auto',
      title: 'Auto pakketten',
      icon: Car,
      description: 'Bekijk onze auto rijles pakketten',
      link: '/auto-pakketten',
      color: '#0065A6',
    },
    {
      id: 'motor',
      title: 'Motor pakketten',
      icon: Bike,
      description: 'Bekijk onze motor rijles pakketten',
      link: '/motor-pakketten',
      color: '#0065A6',
    },
  ];

  const guarantees = [
    'Gratis proefles',
    '€ 7,50 korting per rijles',
    'Morgen starten met je rijles',
    'Succesvolle lesmethode',
    'Beoordeling rijinstructeurs 9.1',
    'Theorie ondersteuning tijdens je les',
  ];

  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Rijles Pakketten"
        subtitle="Vergelijk onze pakketten en start vandaag nog"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Rijles Pakketten' }
        ]}
      />

      {/* Packages Section */}
      <section className={styles.pricingSection}>
        <div className={styles.pricingContent}>
          <h2 className={styles.sectionHeaderTitle}>Bekijk onze pakketten</h2>
          <p className={styles.sectionHeaderSubtitle}>Kies je pakket categorie en start vandaag nog</p>

          <div className={styles.servicesSection} style={{ background: 'transparent', padding: '3rem 0' }}>
            <div className={pakkettenStyles.packageSelectionGrid}>
              {packages.map((pkg, index) => {
                const IconComponent = pkg.icon;
                return (
                  <Link
                    key={pkg.id}
                    href={pkg.link}
                    className={styles.serviceCard}
                    style={{
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div className={styles.serviceIcon3D} style={{ marginBottom: '1.5rem' }}>
                      <IconComponent size={60} strokeWidth={1.5} color={pkg.color} />
                    </div>
                    <h3>{pkg.title}</h3>
                    <p>{pkg.description}</p>
                    <span className={styles.serviceLink}>
                      Bekijk pakketten →
                    </span>
                  </Link>
                );
              })}
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

      {/* Zekerheden Section */}
      <section className={styles.zekerhedenSection}>
        <div className={styles.zekerhedenContent}>
          <h2 className={styles.sectionHeaderTitle}>Pakketten rijles Den Haag - Zoetermeer - Rijswijk - Delft en omgeving</h2>
          <p style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 3rem', fontSize: '1.125rem', color: '#4a5568', lineHeight: '1.8' }}>
            Ben je 16,5? Sta je te popelen voor je rijbewijs? Dan ben je hier aan het juiste adres.
            Bij rijschool Quality-Drive Den Haag – Zoetermeer – Rijswijk – Delft en omgeving verzorgen
            we je alleen de beste rijlessen op maat. Met de 6 zekerheden alleen bij Quality-Drive
            kun je uitgaan van een gegarandeerde succesvolle rijervaring.
          </p>

          <div className={styles.zekerhedenGrid}>
            {guarantees.map((guarantee, index) => (
              <div key={index} className={styles.zekerheidCard}>
                <div className={styles.zekerheidNumber}>{index + 1}</div>
                <h3>{guarantee}</h3>
              </div>
            ))}
          </div>

          <div className={styles.zekerhedenButtons} style={{ marginTop: '3rem' }}>
            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rijschoolButton}
            >
              Gratis proefles inplannen
            </a>
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
