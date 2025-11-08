'use client';

import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import { CheckCircle2, Car, Disc3 } from 'lucide-react';

export default function AutoPakkettenPage() {
  const packages = [
    {
      id: 'basis',
      title: 'Basis Pakket',
      price: '1.099',
      lessons: '20 lessen',
      savings: 'Bespaar € 120',
      features: [
        '20 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Persoonlijke instructeur',
        'Flexibele planning',
      ],
      note: 'Exclusief praktijkexamen CBR',
      popular: false,
    },
    {
      id: 'actie',
      title: 'Actie Pakket',
      price: '1.575',
      lessons: '30 lessen',
      savings: 'Bespaar € 180',
      features: [
        '30 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      note: 'Exclusief praktijkexamen CBR',
      popular: true,
    },
    {
      id: 'tussen',
      title: 'Tussen Pakket',
      price: '1.799',
      lessons: '35 lessen',
      savings: 'Bespaar € 172',
      features: [
        '35 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Exclusief Praktijkexamen CBR',
      popular: false,
    },
    {
      id: 'garantie',
      title: 'Garantie Pakket',
      price: '1.999',
      lessons: '40 lessen',
      savings: 'Bespaar € 200',
      features: [
        '40 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Inclusief praktijkexamen CBR',
      popular: false,
    },
    {
      id: 'compleet',
      title: 'Compleet Pakket',
      price: '2.299',
      lessons: '45 lessen',
      savings: 'Bespaar € 225',
      features: [
        '45 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
      ],
      note: 'Inclusief praktijkexamen CBR',
      popular: false,
    },
    {
      id: 'compleet-plus',
      title: 'Compleet Pakket+',
      price: '2.399',
      lessons: '50 lessen',
      savings: 'Bespaar € 250',
      features: [
        '50 Rijlessen',
        'Gratis proefles t.w.v. €45',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Examenaanvraag inclusief',
        'Faalangst begeleiding',
        'Persoonlijke instructeur',
        'Geld Terug Garantie',
        'Extra ondersteuning',
      ],
      note: 'Inclusief praktijkexamen CBR',
      popular: false,
    },
  ];

  const spoedPackages = [
    {
      id: 'spoed',
      title: 'Spoed Pakket',
      price: '599',
      lessons: '10 lessen',
      savings: 'Bespaar € 60',
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
      price: '1.250',
      lessons: '25 lessen',
      savings: 'Bespaar € 125',
      features: [
        'Gratis proefles t.w.v. €45',
        '25 rijlessen van 60 minuten',
        'Theorie ondersteuning',
        'Tussentijdse toets',
        'Persoonlijke instructeur',
      ],
      popular: false,
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Packages Section */}
      <section className={styles.pricingSection} style={{ paddingTop: '10rem' }}>
        <div className={styles.pricingContent}>
          <h2 className={styles.sectionTitle}>Auto Rijles Pakketten</h2>
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
                  {pkg.note && (
                    <li className={styles.featureNote}>
                      <span>{pkg.note}</span>
                    </li>
                  )}
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

      {/* Spoed Packages Section */}
      <section className={styles.pricingSection} style={{ background: '#fff' }}>
        <div className={styles.pricingContent}>
          <h2 className={styles.sectionTitle}>Spoed Pakketten</h2>
          <p className={styles.sectionSubtitle}>Voor wie snel wil starten met rijlessen</p>

          <div className={styles.pricingGrid} style={{ maxWidth: '900px', margin: '3rem auto 0' }}>
            {spoedPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={styles.pricingCard}
              >
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

      {/* CTA Section */}
      <section className={styles.zekerhedenSection}>
        <div className={styles.zekerhedenContent}>
          <h2 className={styles.sectionTitle}>Vragen over onze pakketten?</h2>
          <p style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 2.5rem', fontSize: '1.125rem', color: '#4a5568' }}>
            Neem contact met ons op voor persoonlijk advies over welk pakket het beste bij jou past
          </p>
          <div className={styles.zekerhedenButtons}>
            <Link
              href="/contact"
              className={styles.rijschoolButton}
            >
              <Car size={20} />
              Neem contact op
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
