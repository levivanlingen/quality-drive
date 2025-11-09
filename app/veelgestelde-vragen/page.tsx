import { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { HeroSection, StartRijavontuurCTA } from '@/app/components/sections';
import pageStyles from '../page.module.css';
import styles from './veelgestelde-vragen.module.css';
import FAQClient from './FAQClient';

export const metadata: Metadata = {
  title: 'Veelgestelde vragen | Quality Drive Rijschool',
  description: 'Vind antwoorden op veelgestelde vragen over rijlessen, rijbewijs, praktijkexamen en meer bij Quality Drive Rijschool.',
  keywords: 'veelgestelde vragen, FAQ, rijles, rijbewijs, praktijkexamen, theorie, Quality Drive',
};

export default function VeelgesteldeVragenPage() {
  return (
    <div className={styles.faqPage}>
      <Header />

      {/* Hero Section */}
      <HeroSection
        title="Veelgestelde vragen"
        subtitle="Vind antwoorden op al je vragen over rijlessen en rijbewijs"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Veelgestelde vragen' }
        ]}
      />

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.faqContainer}>
          <h2 className={pageStyles.sectionHeaderTitle}>Alle antwoorden op één plek</h2>
          <p className={pageStyles.sectionHeaderSubtitle}>
            Heeft u een vraag die hier niet bij staat? Neem gerust <a href="/contact" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>contact</a> met ons op!
          </p>

          <FAQClient />
        </div>
      </section>

      {/* CTA Section */}
      <StartRijavontuurCTA />

      <Footer />
    </div>
  );
}
