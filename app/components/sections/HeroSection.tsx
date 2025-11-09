import Link from 'next/link';
import styles from './HeroSection.module.css';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface HeroSectionProps {
  /** Label boven de titel */
  label?: string;
  /** Hoofdtitel */
  title: string;
  /** Ondertitel onder de titel */
  subtitle?: string;
  /** Breadcrumb items */
  breadcrumbs?: Breadcrumb[];
  /** Additional CSS classes */
  className?: string;
}

/**
 * Hero Section
 * Exact zoals gebruikt op rijopleidingen pagina
 */
export function HeroSection({
  label,
  title,
  subtitle,
  breadcrumbs = [],
  className = '',
}: HeroSectionProps) {
  return (
    <section className={`${styles.hero} ${className}`}>
      <div className={styles.heroContent}>
        {breadcrumbs.length > 0 && (
          <nav className={styles.breadcrumb}>
            {breadcrumbs.map((crumb, index) => (
              <span key={index}>
                {crumb.href ? (
                  <>
                    <Link href={crumb.href}>{crumb.label}</Link>
                    {index < breadcrumbs.length - 1 && (
                      <span className={styles.breadcrumbSeparator}>/</span>
                    )}
                  </>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        {label && <p className={styles.label}>{label}</p>}
        <h1 className={styles.heroTitle}>{title}</h1>
        {subtitle && <p className={styles.heroSubtitle}>{subtitle}</p>}
      </div>
    </section>
  );
}
