'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import { CheckCircle2, Bike, Disc3 } from 'lucide-react';

export default function MotorPakkettenPage() {
  const packages = [
    {
      id: 'spoed',
      title: 'Spoed Pakket',
      price: '499',
      lessons: '10 lessen',
      savings: 'Bespaar € 50',
      features: [
        'Gratis proefles t.w.v. €45',
        '10 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      popular: false,
    },
    {
      id: 'spoed-plus',
      title: 'Spoed Pakket+',
      price: '649',
      lessons: '15 lessen',
      savings: 'Bespaar € 75',
      features: [
        'Gratis proefles t.w.v. €45',
        '15 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      popular: false,
    },
    {
      id: 'tussen',
      title: 'Tussen Pakket',
      price: '749',
      lessons: '18 lessen',
      savings: 'Bespaar € 90',
      features: [
        'Gratis proefles t.w.v. €45',
        '18 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      popular: false,
    },
    {
      id: 'garantie',
      title: 'Garantie Pakket',
      price: '949',
      lessons: '22 lessen',
      savings: 'Bespaar € 110',
      features: [
        'Gratis proefles t.w.v. €45',
        '22 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      popular: true,
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Packages Section */}
      <section className={styles.pricingSection} style={{ paddingTop: '10rem' }}>
        <div className={styles.pricingContent}>
          <h2 className={styles.sectionTitle}>Motor Rijles Pakketten</h2>
          <p className={styles.sectionSubtitle}>Kies het pakket dat bij jou past en start vandaag nog</p>

          <div className={styles.pricingGrid}>
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`${styles.pricingCard} ${pkg.popular ? styles.pricingCardFeatured : ''}`}
              >
                {pkg.popular && (
                  <div className={styles.featuredBadge}>
                    POPULAIR
                  </div>
                )}

                <div className={styles.pricingHeader}>
                  <h3>{pkg.title}</h3>
                  <div className={styles.pricingBadge}>{pkg.savings}</div>
                </div>

                <div className={styles.pricingPrice}>
                  <span className={styles.currency}>€</span>
                  <span className={styles.amount}>{pkg.price}</span>
                </div>

                <div className={styles.pricingLessons}>{pkg.lessons}</div>

                <ul className={styles.pricingFeatures}>
                  {pkg.features.map((feature, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={20} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="https://calendly.com/qualitydrive/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.pricingButton}
                >
                  Gratis proefles inplannen
                </a>
              </div>
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

      {/* Geslaagde Toppers Section */}
      <section className={styles.geslaagdeSection}>
        <div className={styles.geslaagdeContent}>
          <h2 className={styles.geslaagdeTitle}>Wordt jij de volgende?</h2>
          <p className={styles.geslaagdeSubtitle}>De geslaagde motor toppers van Quality Drive</p>

          <div className={styles.geslaagdeGrid}>
            <Image
              src="/uploads/2b938a12-ec01-4987-8445-39a3d17bcbb3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/78dde0c3-cad0-4265-8168-a534326d60fb.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/60b901bf-c187-4a41-b331-c5dce0a7064c.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/107972467_1212829972386094_152816382712214096_n.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/aff19a03-b4e5-47c7-aae2-60f429ce8cb1.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-4.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2024-12-24-09-24-32-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-5.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
            <Image
              src="/uploads/PHOTO-2025-01-17-10-34-37-3.jpg"
              alt="Geslaagde leerling motorrijbewijs"
              width={200}
              height={200}
              loading="lazy"
              className={styles.geslaagdePhoto}
            />
          </div>

          <a
            href="https://calendly.com/qualitydrive/30min"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.geslaagdeCTA}
          >
            Word jij de volgende topper? Start nu!
          </a>
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
      <section className={styles.zekerhedenSection}>
        <div className={styles.zekerhedenContent}>
          <h2 className={styles.sectionTitle}>Klaar om te starten met je motorrijbewijs?</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.125rem', color: '#4a5568' }}>
            Plan vandaag nog je gratis proefles en begin morgen met je rijlessen
          </p>
          <div className={styles.zekerhedenButtons}>
            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rijschoolButton}
            >
              <Bike size={20} />
              Gratis proefles plannen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
