import Link from 'next/link';
import { Check } from 'lucide-react';
import pageStyles from '../../page.module.css';
import styles from './autorijles.module.css';
import type { Package } from './types';

interface PricingSectionProps {
  packages: Package[];
  title?: string;
  subtitle?: string;
  showSection?: boolean;
}

export function PricingSection({
  packages,
  title = 'Rijles pakketten',
  subtitle,
  showSection = true
}: PricingSectionProps) {
  if (!showSection || !packages || packages.length === 0) {
    return null;
  }

  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingContainer}>
        <div className={styles.pricingHeader}>
          <h2 className={pageStyles.sectionHeaderTitle}>{title}</h2>
          {subtitle && <p className={pageStyles.sectionHeaderSubtitle}>{subtitle}</p>}
        </div>

        <div className={styles.packagesGrid}>
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`${styles.packageCard} ${pkg.popular ? styles.popularPackage : ''}`}
            >
              {pkg.popular && (
                <div className={styles.popularBadge}>
                  Meest Gekozen
                </div>
              )}

              <div className={styles.packageHeader}>
                <h3 className={styles.packageName}>{pkg.name}</h3>
                <div className={styles.packagePrice}>
                  <span className={styles.priceAmount}>€{pkg.price}</span>
                  <span className={styles.pricePer}>/{pkg.lessons} lessen</span>
                </div>
                <p className={styles.pricePerLesson}>
                  €{(pkg.price / pkg.lessons).toFixed(2)} per les
                </p>
              </div>

              <ul className={styles.featuresList}>
                {pkg.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className={styles.featureItem}>
                    <Check size={20} className={styles.checkIcon} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {pkg.note && (
                <p className={styles.packageNote}>{pkg.note}</p>
              )}

              <a
                href="https://calendly.com/qualitydrive/30min"
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.packageButton} ${pkg.popular ? styles.popularButton : ''}`}
              >
                Boek dit pakket
              </a>
            </div>
          ))}
        </div>

        <div className={styles.pricingFooter}>
          <p>
            Niet zeker welk pakket bij jou past?{' '}
            <Link href="/rijles-pakketten" className={styles.footerLink}>
              Bekijk alle pakketten
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
