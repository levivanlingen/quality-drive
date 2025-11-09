import { FaWhatsapp } from 'react-icons/fa';
import localStyles from './ZekerhedenSection.module.css';
import styles from '../../page.module.css';

interface Zekerheid {
  number: number;
  title: string;
  description: string;
}

interface ZekerhedenSectionProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofd titel */
  title?: string;
  /** Zekerheden array */
  zekerheden?: Zekerheid[];
  /** Toon buttons */
  showButtons?: boolean;
  /** Button tekst */
  buttonText?: string;
  /** Button link */
  buttonLink?: string;
  /** WhatsApp nummer */
  whatsappNumber?: string;
  /** Additional CSS classes */
  className?: string;
}

const defaultZekerheden: Zekerheid[] = [
  {
    number: 1,
    title: 'Gratis proefles',
    description: 'Start vrijblijvend met een gratis proefles en ervaar onze professionele begeleiding',
  },
  {
    number: 2,
    title: '€ 7,50 korting per rijles',
    description: 'Profiteer van onze scherpe tarieven met maar liefst € 7,50 korting per les',
  },
  {
    number: 3,
    title: 'Morgen starten met je rijles',
    description: 'Geen lange wachtlijsten - begin al morgen met jouw rijlessen',
  },
  {
    number: 4,
    title: 'Succesvolle lesmethode',
    description: 'Bewezen effectieve lesmethode waarmee duizenden leerlingen hun rijbewijs haalden',
  },
  {
    number: 5,
    title: 'Beoordeling rijinstructeurs 9.1',
    description: 'Onze rijinstructeurs scoren gemiddeld een 9.1 van onze tevreden leerlingen',
  },
  {
    number: 6,
    title: 'Theorie ondersteuning tijdens je les',
    description: 'Ontvang persoonlijke theorie begeleiding tijdens je praktijklessen',
  },
];

/**
 * Zekerheden Section
 * Exact zoals gebruikt op homepage
 */
export function ZekerhedenSection({
  label = 'Van Starter tot Pro',
  title = 'De 6 zekerheden alleen bij Quality Drive',
  zekerheden = defaultZekerheden,
  showButtons = true,
  buttonText = 'Gratis proefles inplannen',
  buttonLink = 'https://calendly.com/qualitydrive/30min',
  whatsappNumber = '31620817325',
  className = '',
}: ZekerhedenSectionProps) {
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F`;

  return (
    <section className={`${localStyles.zekerhedenSection} ${className}`}>
      <div className={localStyles.zekerhedenContent}>
        <p className={localStyles.zekerhedenLabel}>{label}</p>
        <h2 className={styles.sectionHeaderTitle}>{title}</h2>

        <div className={localStyles.zekerhedenGrid}>
          {zekerheden.map((zekerheid, index) => (
            <div key={index} className={localStyles.zekerheidCard}>
              <div className={localStyles.zekerheidNumber}>{zekerheid.number}</div>
              <h3>{zekerheid.title}</h3>
              <p>{zekerheid.description}</p>
            </div>
          ))}
        </div>

        {showButtons && (
          <div className={localStyles.zekerhedenButtons}>
            <button className={localStyles.rijschoolButton} onClick={() => window.open(buttonLink, '_blank')}>
              {buttonText}
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={localStyles.whatsappButton}
              title="WhatsApp ons"
            >
              <FaWhatsapp size={30} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
