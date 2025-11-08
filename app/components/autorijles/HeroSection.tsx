import Link from 'next/link';
import styles from './autorijles.module.css';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  cityName: string;
  buttonText?: string;
  buttonLink?: string;
}

export function HeroSection({
  title,
  subtitle,
  cityName,
  buttonText = 'Gratis proefles plannen',
  buttonLink = 'https://calendly.com/qualitydrive/30min'
}: HeroSectionProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
          <Link href="/autorijles">Autorijles</Link>
          <span className={styles.breadcrumbSeparator} aria-hidden="true">/</span>
          <span aria-current="page">{cityName}</span>
        </nav>

        <p className={styles.label}>Quality Drive Rijschool</p>

        <h1 className={styles.title}>{title}</h1>

        <p className={styles.subtitle}>{subtitle}</p>

        <a
          href={buttonLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.heroButton}
          aria-label={`${buttonText} voor ${cityName}`}
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
