import localStyles from './StappenSection.module.css';
import styles from '../../page.module.css';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface StappenSectionProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofd titel */
  title?: string;
  /** Stappen array */
  steps?: Step[];
  /** Additional CSS classes */
  className?: string;
}

const defaultSteps: Step[] = [
  {
    number: 1,
    title: 'Proefles',
    description: 'Plan een gratis proefles in één van onze rijinstructeurs haalt je thuis op',
  },
  {
    number: 2,
    title: 'Pakket kiezen',
    description: 'Na de proefles weet je precies hoeveel lessen je nodig hebt en welk pakket bij jou past',
  },
  {
    number: 3,
    title: 'Start met rijles',
    description: 'Je kan kiezen voor in termijnen betalen en direct starten met rijles',
  },
  {
    number: 4,
    title: 'Rijbewijs halen',
    description: 'Bij ons slaagt elke leerling gegarandeerd en je kan zelfverzekerd de weg op',
  },
];

/**
 * Stappen Section - "In 4 stappen naar je rijbewijs"
 * Exact zoals gebruikt op de rijschool city pages
 */
export function StappenSection({
  label,
  title = 'In 4 stappen naar je rijbewijs',
  steps = defaultSteps,
  className = '',
}: StappenSectionProps) {
  return (
    <section className={`${localStyles.stepsSection} ${className}`}>
      <div className={localStyles.stepsContainer}>
        {label && <p className={localStyles.label}>{label}</p>}
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>

        <div className={localStyles.stepsGrid}>
          {steps.map((step, index) => (
            <div key={index} className={localStyles.stepCard}>
              <div className={localStyles.stepNumber}>{step.number}</div>
              <h3 className={localStyles.stepTitle}>{step.title}</h3>
              <p className={localStyles.stepDescription}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
