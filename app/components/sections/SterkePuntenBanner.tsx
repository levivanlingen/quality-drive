import { CheckCircle2 } from 'lucide-react';
import styles from './SterkePuntenBanner.module.css';

interface SterkePuntenBannerProps {
  /** Features array */
  features: string[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Sterke Punten Banner
 * Exact zoals gebruikt op homepage (3-4 sterke punten met checkmarks)
 */
export function SterkePuntenBanner({
  features,
  className = '',
}: SterkePuntenBannerProps) {
  return (
    <section className={`${styles.features} ${className}`}>
      <div className={styles.featuresList}>
        {features.map((feature, index) => (
          <div key={index} className={styles.featureItem}>
            <CheckCircle2 className={styles.checkIcon} />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
