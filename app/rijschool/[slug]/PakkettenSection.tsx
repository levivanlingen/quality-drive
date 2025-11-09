"use client";

import { CheckCircle2 } from 'lucide-react';
import pageStyles from '../../page.module.css';
import styles from './city.module.css';

export default function PakkettenSection() {
  return (
    <section className={styles.pricingSection}>
      <div className={styles.pricingContent}>
        <h2 className={pageStyles.sectionHeaderTitle}>Populaire Pakketten</h2>
        <p className={pageStyles.sectionHeaderSubtitle}>Kies het pakket dat bij jou past en start vandaag nog</p>

        <div className={styles.pricingGrid}>
          {/* Auto: Basis Pakket */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3>Basis Pakket</h3>
              <div className={styles.pricingBadge}>Bespaar € 120</div>
            </div>
            <div className={styles.pricingPrice}>
              <span className={styles.currency}>€</span>
              <span className={styles.amount}>1.099</span>
            </div>
            <div className={styles.pricingLessons}>20 lessen</div>
            <ul className={styles.pricingFeatures}>
              <li>
                <CheckCircle2 size={20} />
                <span>20 Rijlessen</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Gratis proefles t.w.v. €45</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Theorie ondersteuning</span>
              </li>
              <li className={styles.featureNote}>
                <span>Exclusief praktijkexamen CBR</span>
              </li>
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

          {/* Auto: Actie Pakket - Featured */}
          <div className={`${styles.pricingCard} ${styles.pricingCardFeatured}`}>
            <div className={styles.featuredBadge}>Populair</div>
            <div className={styles.pricingHeader}>
              <h3>Actie Pakket</h3>
              <div className={styles.pricingBadge}>Bespaar € 180</div>
            </div>
            <div className={styles.pricingPrice}>
              <span className={styles.currency}>€</span>
              <span className={styles.amount}>1.575</span>
            </div>
            <div className={styles.pricingLessons}>30 lessen</div>
            <ul className={styles.pricingFeatures}>
              <li>
                <CheckCircle2 size={20} />
                <span>30 Rijlessen</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Gratis proefles t.w.v. €45</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Theorie ondersteuning</span>
              </li>
              <li className={styles.featureNote}>
                <span>Exclusief praktijkexamen CBR</span>
              </li>
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

          {/* Auto: Tussen Pakket */}
          <div className={styles.pricingCard}>
            <div className={styles.pricingHeader}>
              <h3>Tussen Pakket</h3>
              <div className={styles.pricingBadge}>Bespaar € 172</div>
            </div>
            <div className={styles.pricingPrice}>
              <span className={styles.currency}>€</span>
              <span className={styles.amount}>1.799</span>
            </div>
            <div className={styles.pricingLessons}>35 lessen</div>
            <ul className={styles.pricingFeatures}>
              <li>
                <CheckCircle2 size={20} />
                <span>35 Rijlessen</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Gratis proefles t.w.v. €45</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Theorie ondersteuning</span>
              </li>
              <li>
                <CheckCircle2 size={20} />
                <span>Geld Terug Garantie</span>
              </li>
              <li className={styles.featureNote}>
                <span>Exclusief Praktijkexamen CBR</span>
              </li>
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
        </div>
      </div>
    </section>
  );
}
