'use client';

import Link from 'next/link';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import rijopleidingenStyles from './rijopleidingen.module.css';
import { Car, Bike, Shield, Brain, Heart, CarFront, Disc3 } from 'lucide-react';

export default function RijopleidingenPage() {
  const courses = [
    {
      id: 'motor',
      title: 'A - Motor',
      icon: Bike,
      description: 'Leer motorrijden met professionele begeleiding en de nieuwste motoren',
      link: '/motorrijles',
      color: '#0065A6',
    },
    {
      id: 'auto',
      title: 'B - Auto',
      icon: Car,
      description: 'Klassieke autorijlessen met handgeschakelde auto\'s',
      link: '/autorijles',
      color: '#0065A6',
    },
    {
      id: 'automaat',
      title: 'B - Automaat',
      icon: Car,
      description: 'Comfortabel rijden met automatische versnelling',
      link: '/automaat-rijles',
      color: '#0065A6',
    },
    {
      id: 'taxi',
      title: 'B - Taxi',
      icon: CarFront,
      description: 'Gespecialiseerde taxichauffeur opleiding',
      link: '/taxi-rijles',
      color: '#0065A6',
    },
    {
      id: 'faalangst',
      title: 'B/A - Faalangst',
      icon: Heart,
      description: 'Rijlessen speciaal voor mensen met faalangst',
      link: '/rijschool-faalangst',
      color: '#0065A6',
    },
    {
      id: 'add',
      title: 'B/A - ADD',
      icon: Brain,
      description: 'Rijlessen aangepast voor mensen met ADD',
      link: '/rijschool-add',
      color: '#0065A6',
    },
    {
      id: 'adhd',
      title: 'B/A - ADHD',
      icon: Brain,
      description: 'Rijlessen speciaal afgestemd op ADHD',
      link: '/rijschool-adhd',
      color: '#0065A6',
    },
  ];

  return (
    <div className={styles.page}>
      <Header />

      {/* Hero Section */}
      <section className={rijopleidingenStyles.hero}>
        <div className={rijopleidingenStyles.heroContent}>
          {/* Breadcrumb */}
          <nav className={rijopleidingenStyles.breadcrumb}>
            <Link href="/">Home</Link>
            <span className={rijopleidingenStyles.breadcrumbSeparator}>/</span>
            <span>Rijopleidingen</span>
          </nav>

          <h1 className={rijopleidingenStyles.heroTitle}>
            Bekijk onze rijopleidingen
          </h1>
          <p className={rijopleidingenStyles.heroSubtitle}>
            Voor welke rijopleiding ga jij?
          </p>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className={rijopleidingenStyles.coursesSection}>
        <div className={rijopleidingenStyles.coursesContainer}>
          <div className={rijopleidingenStyles.coursesGrid}>
            {courses.map((course, index) => {
              const IconComponent = course.icon;
              return (
                <Link
                  key={course.id}
                  href={course.link}
                  className={rijopleidingenStyles.courseCard}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  <div
                    className={rijopleidingenStyles.courseIcon}
                    style={{ background: course.color }}
                  >
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>
                  <h3 className={rijopleidingenStyles.courseTitle}>
                    {course.title}
                  </h3>
                  <p className={rijopleidingenStyles.courseDescription}>
                    {course.description}
                  </p>
                  <div className={rijopleidingenStyles.courseArrow}>
                    →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className={styles.sectionDivider}>
        <div className={styles.dividerLine}></div>
        <div className={styles.dividerIcon}>
          <Disc3 size={48} strokeWidth={2} color="#cbd5e1" />
        </div>
        <div className={styles.dividerLine}></div>
      </div>

      {/* CTA Section */}
      <section className={rijopleidingenStyles.ctaSection}>
        <div className={rijopleidingenStyles.ctaContainer}>
          <div className={rijopleidingenStyles.ctaContent}>
            <p className={rijopleidingenStyles.ctaLabel}>Begin vandaag nog</p>
            <h2 className={rijopleidingenStyles.ctaTitle}>
              Start jouw Rijavontuur bij Quality Drive!
            </h2>
            <p className={rijopleidingenStyles.ctaText}>
              Hierboven kun je een keuze maken tussen de verschillende rijopleidingen.
              Wij werken in <strong>Den Haag, Zoetermeer, Delft, Rijswijk</strong> en omgeving.
            </p>
            <p className={rijopleidingenStyles.ctaText}>
              Als je vragen hebt kun je geheel vrijblijvend contact met ons opnemen,
              we helpen je graag verder.
            </p>

            <div className={rijopleidingenStyles.guaranteeSection}>
              <h3 className={rijopleidingenStyles.guaranteeTitle}>
                <Shield size={28} />
                Onze Zekerheid aan jou
              </h3>
              <p className={rijopleidingenStyles.guaranteeText}>
                Bij Quality Drive zorgen we ervoor dat je met zekerheid jouw rijbewijs haalt.
                Wij bieden niet alleen uitstekende rijlessen, maar ook de garantie dat je goed
                voorbereid en vol vertrouwen je rijexamen aflegt.
              </p>
            </div>

            <a
              href="https://calendly.com/qualitydrive/30min"
              target="_blank"
              rel="noopener noreferrer"
              className={rijopleidingenStyles.ctaButton}
            >
              <Car size={20} />
              Gratis proefles plannen
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
