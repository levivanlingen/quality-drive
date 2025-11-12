import styles from './steps.module.css';

export default function StepsSection() {
  return (
    <section className={styles.stepsSection}>
      <div className={styles.stepsContainer}>
        <h2 className={styles.stepsMainTitle}>In 4 stappen naar je motorrijbewijs</h2>

        <div className={styles.stepsGrid}>

          {/* Step 1 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <h3 className={styles.stepTitle}>Proefles</h3>
            <p className={styles.stepDescription}>
              Plan een gratis proefles in en ervaar het gevoel van motorrijden met onze professionele instructeurs
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
            <h3 className={styles.stepTitle}>Start met motorrijles</h3>
            <p className={styles.stepDescription}>
              Je kan kiezen voor in termijnen betalen en direct starten met motorrijles
            </p>
          </div>

          {/* Step 4 */}
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>4</div>
            <h3 className={styles.stepTitle}>Motorrijbewijs halen</h3>
            <p className={styles.stepDescription}>
              Bij ons slaagt elke leerling gegarandeerd en je kan zelfverzekerd de weg op met je motor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
