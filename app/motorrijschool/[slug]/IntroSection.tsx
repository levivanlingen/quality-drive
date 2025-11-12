import styles from './intro.module.css';

interface IntroSectionProps {
  cityName: string;
  image?: string;
  imageAlt?: string;
}

export default function IntroSection({ cityName, image, imageAlt }: IntroSectionProps) {
  // Default fallback image - motor image instead of museum
  const defaultImage = '/uploads/speed-twin-900-my25-r2r-hero-2-1920x1080.avif';
  const displayImage = image || defaultImage;
  const displayAlt = imageAlt || `Motorrijschool ${cityName} - Quality Drive motorrijlessen`;

  return (
    <section className={styles.introSection}>
      <div className={styles.introContainer}>
        <div className={styles.introGrid}>
          {/* Left: Text Content */}
          <div className={styles.introContent}>
            <h2 className={styles.introTitle}>
              #1 Beste Motorrijschool {cityName}
            </h2>
            <p className={styles.introText}>
              Bij Motorrijschool {cityName} staan wij klaar om jou te helpen jouw droom van
              motorrijden te realiseren. Onze rijschool, Quality Drive, biedt een breed scala
              aan motorrijlessen die zijn afgestemd op zowel beginners als gevorderde rijders.
              Met een team van ervaren en gecertificeerde instructeurs, moderne lesmethoden,
              en een hoge slagingspercentage, garanderen wij een leerzame en plezierige
              ervaring op weg naar jouw motorrijbewijs.
            </p>
            <a
              href="https://calendly.com/quality-drive-info/motor"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ctaButton}
            >
              <svg className={styles.ctaIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Gratis proefles inplannen
            </a>
          </div>

          {/* Right: Image */}
          <div className={styles.introImageWrapper}>
            <img
              src={displayImage}
              alt={displayAlt}
              className={styles.introImage}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
