import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, StartRijavontuurCTA } from '@/app/components/sections';
import styles from './vacature.module.css';
import { Mail, Phone, Send } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Vacature Rijinstructeur | Quality Drive Rijschool',
  description: 'Word rijinstructeur bij Quality Drive. We zoeken gemotiveerde en gepassioneerde collega\'s die ons team willen versterken.',
  keywords: 'vacature, rijinstructeur, werken bij, Quality Drive, solliciteren',
};

export default function VacaturePage() {
  return (
    <div className={styles.vacaturePage}>
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Werken bij Quality Drive"
        subtitle="Kom werken bij de beste rijschool van de regio"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Vacature' }
        ]}
      />

      {/* Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          <div className={styles.contentCard}>
            <h2 className={styles.contentTitle}>Vacature: Rijinstructeur</h2>

            <p className={styles.contentText}>
              Bij Quality Drive zijn we op zoek naar gemotiveerde en gepassioneerde collega's om ons team te versterken. We zijn een gerenommeerde rijschool die staat voor kwaliteit, veiligheid en persoonlijke aandacht. Wil jij deel uitmaken van een enthousiast team dat elke dag streeft naar het beste voor onze leerlingen? Neem dan nu snel contact op!
            </p>

            <div className={styles.highlightBox}>
              <p>
                💼 Ben jij de rijinstructeur die wij zoeken? Word onderdeel van Quality Drive en help leerlingen naar hun rijbewijs!
              </p>
            </div>

            <div className={styles.ctaButtons}>
              <Link href="/contact" className={styles.primaryButton}>
                <Mail size={20} />
                Neem contact op
              </Link>

              <a
                href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd%20in%20de%20vacature%20voor%20rijinstructeur.%20Kunnen%20we%20hierover%20in%20gesprek%3F"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.secondaryButton}
              >
                <Send size={20} />
                WhatsApp ons
              </a>

              <a
                href="tel:+31620817325"
                className={styles.secondaryButton}
              >
                <Phone size={20} />
                Bel direct
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <StartRijavontuurCTA />

      <Footer />
    </div>
  );
}
