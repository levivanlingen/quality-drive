import Image from 'next/image';
import styles from './geslaagden.module.css';

interface GeslaagdenSectionProps {
  cityName: string;
}

export default function GeslaagdenSection({ cityName }: GeslaagdenSectionProps) {
  return (
    <section className={styles.geslaagdeSection}>
      <div className={styles.geslaagdeContent}>
        <h2 className={styles.sectionHeaderTitle}>Wordt jij de volgende?</h2>
        <p className={styles.sectionHeaderSubtitle}>De geslaagde motor toppers van Quality Drive</p>

        <div className={styles.geslaagdeGrid}>
          <Image
            src="/uploads/2b938a12-ec01-4987-8445-39a3d17bcbb3.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/78dde0c3-cad0-4265-8168-a534326d60fb.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/60b901bf-c187-4a41-b331-c5dce0a7064c.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/107972467_1212829972386094_152816382712214096_n.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/aff19a03-b4e5-47c7-aae2-60f429ce8cb1.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/PHOTO-2024-12-24-09-24-32-4.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/PHOTO-2024-12-24-09-24-32-5.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/PHOTO-2025-01-17-10-34-37-5.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
          <Image
            src="/uploads/PHOTO-2025-01-17-10-34-37-3.jpg"
            alt="Geslaagde leerling motorrijbewijs"
            width={400}
            height={350}
            loading="lazy"
            className={styles.geslaagdePhoto}
          />
        </div>

        <button className={styles.geslaagdeCTA}>
          Word jij de volgende topper? Start nu!
        </button>
      </div>
    </section>
  );
}
