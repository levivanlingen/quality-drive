import styles from './banner.module.css';

export default function BannerSection() {
  return (
    <section className={styles.bannerSection}>
      <div className={styles.bannerOverlay}></div>
      <div className={styles.bannerContainer}>
        <div className={styles.bannerContent}>
          <h3 className={styles.bannerLabel}>Speciale actie</h3>
          <h2 className={styles.bannerTitle}>
            BINNEN 4 WEKEN OP EXAMEN VOOR JE MOTORRIJBEWIJS!!!
          </h2>
          <a
            href="https://calendly.com/quality-drive-info/motor"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.bannerButton}
          >
            <svg className={styles.bannerIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Plan proefles nu in
          </a>
        </div>
      </div>
    </section>
  );
}
