import { Gift, Zap, Shield, Car, Calendar, UserCheck } from 'lucide-react';
import pageStyles from '../../page.module.css';
import styles from './autorijles.module.css';
import type { Feature } from './types';

const iconMap: Record<string, any> = {
  gift: Gift,
  zap: Zap,
  shield: Shield,
  car: Car,
  calendar: Calendar,
  'user-check': UserCheck,
};

interface FeaturesGridProps {
  features: Feature[];
  title?: string;
}

export function FeaturesGrid({ features, title = 'Waarom Quality Drive?' }: FeaturesGridProps) {
  return (
    <section className={styles.featuresSection}>
      <div className={styles.featuresContainer}>
        <h2 className={pageStyles.sectionHeaderTitle}>{title}</h2>

        <div className={styles.featuresGrid}>
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Gift;

            return (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>
                  <IconComponent size={32} strokeWidth={1.5} />
                </div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
