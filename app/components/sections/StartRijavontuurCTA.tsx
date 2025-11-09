import styles from './StartRijavontuurCTA.module.css';

interface StartRijavontuurCTAProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofd titel */
  title?: string;
  /** Tekst */
  text?: string;
  /** Button tekst */
  buttonText?: string;
  /** Button link */
  buttonLink?: string;
  /** Achtergrond afbeelding URL */
  backgroundImage?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Start Rijavontuur CTA Section
 * Exact zoals gebruikt op rijschool city pages
 */
export function StartRijavontuurCTA({
  label = 'Begin vandaag nog',
  title = 'Start jouw Rijavontuur bij Quality Drive!',
  text,
  buttonText = 'Gratis proefles plannen',
  buttonLink = 'https://calendly.com/qualitydrive/30min',
  backgroundImage = '/uploads/Night-Driving-CarBaba-1.jpg',
  className = '',
}: StartRijavontuurCTAProps) {
  return (
    <section
      className={`${styles.ctaSection} ${className}`}
      style={{ backgroundImage: `linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.4) 100%), url('${backgroundImage}')` }}
    >
      <div className={styles.ctaContainer}>
        <div className={styles.ctaContent}>
          <p className={styles.ctaLabel}>{label}</p>
          <h2 className={styles.ctaTitle}>{title}</h2>

          {text ? (
            <p className={styles.ctaText}>{text}</p>
          ) : (
            <>
              <p className={styles.ctaText}>
                Hierboven kun je een keuze maken tussen de verschillende rijopleidingen.
                Wij werken in Den Haag, Zoetermeer, Delft, Rijswijk en omgeving.
              </p>
              <p className={styles.ctaText}>
                Als je vragen hebt kun je geheel vrijblijvend contact met ons opnemen,
                we helpen je graag verder.
              </p>
              <h3 className={styles.ctaSubtitle}>Onze Zekerheid aan jou</h3>
              <p className={styles.ctaText}>
                Bij Quality Drive zorgen we ervoor dat je met zekerheid jouw rijbewijs haalt.
                Wij bieden niet alleen uitstekende rijlessen, maar ook de garantie dat je goed
                voorbereid en vol vertrouwen je rijexamen aflegt.
              </p>
            </>
          )}

          <a
            href={buttonLink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ctaButton}
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
