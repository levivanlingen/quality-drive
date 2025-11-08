import { CheckCircle2 } from 'lucide-react';
import styles from './autorijles.module.css';
import type { WhyPoint } from './types';

interface WhySectionProps {
  title?: string;
  text?: string;
  points: WhyPoint[];
}

export function WhySection({
  title = 'Waarom kiezen voor Quality Drive?',
  text,
  points
}: WhySectionProps) {
  if (!points || points.length === 0) return null;

  return (
    <section className={styles.whySection}>
      <div className={styles.whyContainer}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        {text && <p className={styles.whyIntroText}>{text}</p>}

        <div className={styles.whyGrid}>
          {points.map((point, index) => (
            <div key={index} className={styles.whyCard}>
              <div className={styles.whyIconWrapper}>
                <CheckCircle2 size={28} className={styles.whyIcon} />
              </div>
              <h3 className={styles.whyTitle}>{point.title}</h3>
              <p className={styles.whyDescription}>{point.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
