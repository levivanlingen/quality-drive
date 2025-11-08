import styles from './autorijles.module.css';

interface CTASectionProps {
  title?: string;
  text: string;
  buttonText?: string;
  buttonLink?: string;
  image?: string;
}

export function CTASection({
  title = 'Start vandaag nog!',
  text,
  buttonText = 'Gratis proefles plannen',
  buttonLink = 'https://calendly.com/qualitydrive/30min',
  image
}: CTASectionProps) {
  return (
    <section className={styles.ctaSection} style={image ? { backgroundImage: `url(${image})` } : undefined}>
      <div className={styles.ctaOverlay}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>{title}</h2>
          <p className={styles.ctaText}>{text}</p>
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
