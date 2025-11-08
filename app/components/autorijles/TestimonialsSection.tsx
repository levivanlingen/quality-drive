import { Star } from 'lucide-react';
import styles from './autorijles.module.css';
import type { Testimonial } from './types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  showSection?: boolean;
}

export function TestimonialsSection({
  testimonials,
  showSection = true
}: TestimonialsSectionProps) {
  if (!showSection || !testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsContainer}>
        <h2 className={styles.sectionTitle}>Wat onze leerlingen zeggen</h2>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" className={styles.starIcon} />
                ))}
              </div>

              <p className={styles.testimonialText}>&ldquo;{testimonial.text}&rdquo;</p>

              <div className={styles.testimonialAuthor}>
                <p className={styles.authorName}>{testimonial.name}</p>
                {testimonial.location && (
                  <p className={styles.authorLocation}>{testimonial.location}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
