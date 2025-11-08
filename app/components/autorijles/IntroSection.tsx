import styles from './autorijles.module.css';

interface IntroSectionProps {
  title?: string;
  text: string;
}

export function IntroSection({ title, text }: IntroSectionProps) {
  if (!text) return null;

  return (
    <section className={styles.introSection}>
      <div className={styles.introContainer}>
        {title && <h2 className={styles.introTitle}>{title}</h2>}
        <p className={styles.introText}>{text}</p>
      </div>
    </section>
  );
}
