import styles from './zekerheden.module.css';

interface ZekerhedenSectionProps {
  cityName: string;
}

export default function ZekerhedenSection({ cityName }: ZekerhedenSectionProps) {
  const zekerheden = [
    'Inclusief helm, motor & motorkleding in bruikleen',
    'Nieuwste motors voor veiliger op de weg',
    'Verzekering tijdens je lessen en examen',
    'Betalen in termijnen mogelijk',
    'Binnen 4 weken op examen',
    'Gratis proefles t.w.v. €45',
    'Geld terug garantie',
  ];

  return (
    <section className={styles.zekerhedenSection}>
      <div className={styles.zekerhedenContainer}>
        <div className={styles.zekerhedenGrid}>
          {/* Left: Image */}
          <div className={styles.imageColumn}>
            <h2 className={styles.imageTitle}>
              Beste goedkope motorrijschool {cityName} en omgeving
            </h2>
            <img
              src="https://quality-drive.nl/wp-content/uploads/2025/01/PHOTO-2025-01-17-10-09-12-3-1024x768.jpg"
              alt={`Motorrijschool ${cityName}`}
              className={styles.zekerhedenImage}
              loading="lazy"
            />
          </div>

          {/* Right: Features */}
          <div className={styles.featuresColumn}>
            <p className={styles.featuresLabel}>Van Starter tot Pro</p>
            <h2 className={styles.featuresTitle}>De 7 zekerheden alleen bij Quality Drive</h2>

            <ul className={styles.featuresList}>
              {zekerheden.map((zekerheid, index) => (
                <li key={index} className={styles.featureItem}>
                  <svg className={styles.checkIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  {zekerheid}
                </li>
              ))}
            </ul>

            <div className={styles.ctaButtons}>
              <a
                href="https://calendly.com/quality-drive-info/motor"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rijschoolButton}
              >
                Gratis proefles plannen
              </a>
              <a
                href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.whatsappButton}
                aria-label="Contact via WhatsApp"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>1823</div>
            <div className={styles.statLabel}>Geslaagde leerlingen</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>13</div>
            <div className={styles.statLabel}>Expert rijinstructeurs</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNumber}>100<span className={styles.statPercent}>%</span></div>
            <div className={styles.statLabel}>Tevreden leerlingen</div>
          </div>
        </div>
      </div>
    </section>
  );
}
