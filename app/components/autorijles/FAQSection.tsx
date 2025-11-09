'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import pageStyles from '../../page.module.css';
import styles from './autorijles.module.css';
import type { FAQ } from './types';

interface FAQSectionProps {
  faqs: FAQ[];
  title?: string;
  showSection?: boolean;
}

export function FAQSection({
  faqs,
  title = 'Veelgestelde vragen',
  showSection = true
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!showSection || !faqs || faqs.length === 0) {
    return null;
  }

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.faqSection}>
      <div className={styles.faqContainer}>
        <h2 className={pageStyles.sectionHeaderTitle}>{title}</h2>

        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${openIndex === index ? styles.faqItemOpen : ''}`}
            >
              <button
                className={styles.faqQuestion}
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span>{faq.question}</span>
                <ChevronDown
                  size={24}
                  className={styles.faqIcon}
                  style={{
                    transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }}
                />
              </button>

              {openIndex === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
