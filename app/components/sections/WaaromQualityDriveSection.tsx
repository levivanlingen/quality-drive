import { Trophy, Users, Car, Settings, BookOpen, LucideIcon } from 'lucide-react';
import localStyles from './WaaromQualityDriveSection.module.css';
import styles from '../../page.module.css';

type IconName = 'trophy' | 'users' | 'car' | 'settings' | 'book';

interface Benefit {
  icon: IconName;
  title: string;
  description: string;
}

interface WaaromQualityDriveSectionProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofd titel */
  title?: string;
  /** Benefits array */
  benefits?: Benefit[];
  /** Additional CSS classes */
  className?: string;
}

const iconMap: Record<IconName, LucideIcon> = {
  trophy: Trophy,
  users: Users,
  car: Car,
  settings: Settings,
  book: BookOpen,
};

const defaultBenefits: Benefit[] = [
  {
    icon: 'trophy',
    title: 'Succes Gegarandeerd',
    description:
      'Bij Quality Drive bent u verzekerd van succes. Dankzij onze bewezen methodes en ervaren instructeurs heeft u de hoogste kans om uw rijbewijs te behalen. Ons slagingspercentage spreekt voor zich: met Quality Drive slaagt u!',
  },
  {
    icon: 'users',
    title: 'Top Instructeurs',
    description:
      'Onze instructeurs zijn deskundig, geduldig en toegewijd aan uw succes. Ze zijn er om u te ondersteunen bij elke stap, u gerust te stellen en uw zelfvertrouwen op te bouwen. Hun persoonlijke aanpak zorgt ervoor dat u zich altijd op uw gemak voelt.',
  },
  {
    icon: 'car',
    title: 'Moderne en Veilige Voertuigen',
    description:
      'U leert rijden in goed onderhouden, moderne voertuigen die voorzien zijn van de nieuwste veiligheidsvoorzieningen. Dit zorgt voor een veilige en comfortabele leeromgeving, waardoor u zich volledig kunt concentreren op uw rijvaardigheden.',
  },
  {
    icon: 'settings',
    title: 'Individueel Aangepaste Lesprogramma\'s',
    description:
      'Bij Quality Drive geloven we dat maatwerk de sleutel tot succes is. Onze lesprogramma\'s worden aangepast aan uw specifieke behoeften en leerstijl, zodat u zich in uw eigen tempo kunt ontwikkelen en zelfverzekerd naar uw rijexamen kunt toewerken.',
  },
  {
    icon: 'book',
    title: 'Uitgebreide Theorieondersteuning',
    description:
      'Wij bieden uitgebreide ondersteuning bij uw theorie-examen. Met onze effectieve cursussen en oefenmateriaal bent u goed voorbereid en heeft u de kennis die nodig is om te slagen.',
  },
];

/**
 * Waarom Quality Drive Section
 * Exact zoals gebruikt op rijschool city pages en homepage
 */
export function WaaromQualityDriveSection({
  label,
  title = 'Waarom Quality Drive?',
  benefits = defaultBenefits,
  className = '',
}: WaaromQualityDriveSectionProps) {
  return (
    <section className={`${localStyles.waaromQDSection} ${className}`}>
      <div className={localStyles.waaromQDContent}>
        {label && <p className={localStyles.label}>{label}</p>}
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>

        <div className={localStyles.benefitsGrid}>
          {benefits.map((benefit, index) => {
            const Icon = iconMap[benefit.icon];

            return (
              <div key={index} className={localStyles.benefitCard}>
                <div className={localStyles.benefitIcon}>
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
