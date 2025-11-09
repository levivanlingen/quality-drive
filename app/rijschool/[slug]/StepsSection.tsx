import styles from './city.module.css';

export default function StepsSection() {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.stepsContainer}>
        <h2 className={styles.stepsMainTitle}>In 4 stappen naar je rijbewijs</h2>

        <div className={styles.stepsGrid}>

          {/* Step 1 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Proefles</h3>
            <p className={styles.stepDescription}>
              Plan een gratis proefles in één van onze rijinstructeurs haalt je thuis op
            </p>
          </div>

          {/* Step 2 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <h3 className={styles.stepTitle}>Pakket kiezen</h3>
            <p className={styles.stepDescription}>
              Na de proefles weet je precies hoeveel lessen je nodig hebt en welk pakket bij jou past
            </p>
          </div>

          {/* Step 3 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <h3 className={styles.stepTitle}>Start met rijles</h3>
            <p className={styles.stepDescription}>
              Je kan kiezen voor in termijnen betalen en direct starten met rijles
            </p>
          </div>

          {/* Step 4 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>4</div>
            <h3 className={styles.stepTitle}>Rijbewijs halen</h3>
            <p className={styles.stepDescription}>
              Bij ons slaagt elke leerling gegarandeerd en je kan zelfverzekerd de weg op
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
