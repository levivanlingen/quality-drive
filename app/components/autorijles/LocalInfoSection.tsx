import { MapPin, Route } from 'lucide-react';
import styles from './autorijles.module.css';

interface LocalInfoSectionProps {
  title?: string;
  text: string;
  examLocation?: string;
  popularRoutes?: string[];
  cityName: string;
}

export function LocalInfoSection({
  title,
  text,
  examLocation,
  popularRoutes,
  cityName
}: LocalInfoSectionProps) {
  if (!text) return null;

  return (
    <section className={styles.localSection}>
      <div className={styles.localContainer}>
        {title && <h2 className={styles.sectionTitle}>{title}</h2>}

        <p className={styles.localText}>{text}</p>

        <div className={styles.localInfoGrid}>
          {examLocation && (
            <div className={styles.localInfoCard}>
              <div className={styles.localInfoIcon}>
                <MapPin size={32} strokeWidth={1.5} />
              </div>
              <h3 className={styles.localInfoTitle}>CBR Examenlokatie</h3>
              <p className={styles.localInfoText}>{examLocation}</p>
            </div>
          )}

          {popularRoutes && popularRoutes.length > 0 && (
            <div className={styles.localInfoCard}>
              <div className={styles.localInfoIcon}>
                <Route size={32} strokeWidth={1.5} />
              </div>
              <h3 className={styles.localInfoTitle}>Populaire Oefenroutes</h3>
              <ul className={styles.routesList}>
                {popularRoutes.map((route, index) => (
                  <li key={index} className={styles.routeItem}>{route}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
