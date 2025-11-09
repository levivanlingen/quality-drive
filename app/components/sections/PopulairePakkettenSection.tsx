'use client';

import { CheckCircle2 } from 'lucide-react';
import localStyles from './PopulairePakkettenSection.module.css';
import styles from '../../page.module.css';

interface Package {
  name: string;
  price: number;
  lessons: number;
  savings: number;
  features: string[];
  note?: string;
  featured?: boolean;
}

interface PopulairePakkettenSectionProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofd titel */
  title?: string;
  /** Subtitel */
  subtitle?: string;
  /** Pakketten array */
  packages?: Package[];
  /** CTA button link */
  buttonLink?: string;
  /** Tekst achter de prijs (bijv. "2x") */
  priceSuffix?: string;
  /** Additional CSS classes */
  className?: string;
}

const defaultPackages: Package[] = [
  {
    name: 'Basis Pakket',
    price: 1099,
    lessons: 20,
    savings: 120,
    features: [
      '20 Rijlessen',
      'Gratis proefles t.w.v. €45',
      'Theorie ondersteuning',
    ],
    note: 'Exclusief praktijkexamen CBR',
  },
  {
    name: 'Actie Pakket',
    price: 1575,
    lessons: 30,
    savings: 180,
    features: [
      '30 Rijlessen',
      'Gratis proefles t.w.v. €45',
      'Theorie ondersteuning',
    ],
    note: 'Exclusief praktijkexamen CBR',
    featured: true,
  },
  {
    name: 'Tussen Pakket',
    price: 1799,
    lessons: 35,
    savings: 172,
    features: [
      '35 Rijlessen',
      'Gratis proefles t.w.v. €45',
      'Theorie ondersteuning',
      'Geld Terug Garantie',
    ],
    note: 'Exclusief Praktijkexamen CBR',
  },
];

/**
 * Populaire Pakketten Section
 * Exact zoals gebruikt op rijschool city pages
 */
export function PopulairePakkettenSection({
  label,
  title = 'Populaire Pakketten',
  subtitle = 'Kies het pakket dat bij jou past en start vandaag nog',
  packages = defaultPackages,
  buttonLink = 'https://calendly.com/qualitydrive/30min',
  priceSuffix = '',
  className = '',
}: PopulairePakkettenSectionProps) {
  return (
    <section className={`${localStyles.pricingSection} ${className}`}>
      <div className={localStyles.pricingContent}>
        {label && <p className={localStyles.label}>{label}</p>}
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>
        <p className={styles.sectionHeaderSubtitle}>{subtitle}</p>

        <div className={localStyles.pricingGrid}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`${localStyles.pricingCard} ${pkg.featured ? localStyles.pricingCardFeatured : ''}`}
            >
              {pkg.featured && (
                <div className={localStyles.featuredBadge}>Populair</div>
              )}

              <div className={localStyles.pricingHeader}>
                <h3>{pkg.name}</h3>
                <div className={localStyles.pricingBadge}>Bespaar € {pkg.savings}</div>
              </div>

              <div className={localStyles.pricingPrice}>
                <span className={localStyles.currency}>€</span>
                <span className={localStyles.amount}>{pkg.price}</span>
                {priceSuffix && <span className={localStyles.priceSuffix}>{priceSuffix}</span>}
              </div>

              <div className={localStyles.pricingLessons}>{pkg.lessons} lessen</div>

              <ul className={localStyles.pricingFeatures}>
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>
                    <CheckCircle2 size={20} />
                    <span>{feature}</span>
                  </li>
                ))}
                {pkg.note && (
                  <li className={localStyles.featureNote}>
                    <span>{pkg.note}</span>
                  </li>
                )}
              </ul>

              <a
                href={buttonLink}
                target="_blank"
                rel="noopener noreferrer"
                className={localStyles.pricingButton}
              >
                Gratis proefles inplannen
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
