'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

// Build timestamp: 2025-11-06-19-35 - NO LOGIN BUTTONS

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);
  const [isRijopleidingenDropdownOpen, setIsRijopleidingenDropdownOpen] = useState(false);
  const [isPakkettenDropdownOpen, setIsPakkettenDropdownOpen] = useState(false);
  const aboutDropdownRef = useRef<HTMLDivElement>(null);
  const rijopleidingenDropdownRef = useRef<HTMLDivElement>(null);
  const pakkettenDropdownRef = useRef<HTMLDivElement>(null);
  const aboutCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const rijopleidingenCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pakkettenCloseTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    // Only run on client after hydration
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aboutDropdownRef.current && !aboutDropdownRef.current.contains(event.target as Node)) {
        setIsAboutDropdownOpen(false);
      }
      if (rijopleidingenDropdownRef.current && !rijopleidingenDropdownRef.current.contains(event.target as Node)) {
        setIsRijopleidingenDropdownOpen(false);
      }
      if (pakkettenDropdownRef.current && !pakkettenDropdownRef.current.contains(event.target as Node)) {
        setIsPakkettenDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleAboutDropdownMouseEnter = () => {
    if (aboutCloseTimeoutRef.current) {
      clearTimeout(aboutCloseTimeoutRef.current);
      aboutCloseTimeoutRef.current = null;
    }
    setIsAboutDropdownOpen(true);
  };

  const handleAboutDropdownMouseLeave = () => {
    aboutCloseTimeoutRef.current = setTimeout(() => {
      setIsAboutDropdownOpen(false);
    }, 150);
  };

  const handleRijopleidingenDropdownMouseEnter = () => {
    if (rijopleidingenCloseTimeoutRef.current) {
      clearTimeout(rijopleidingenCloseTimeoutRef.current);
      rijopleidingenCloseTimeoutRef.current = null;
    }
    setIsRijopleidingenDropdownOpen(true);
  };

  const handleRijopleidingenDropdownMouseLeave = () => {
    rijopleidingenCloseTimeoutRef.current = setTimeout(() => {
      setIsRijopleidingenDropdownOpen(false);
    }, 150);
  };

  const handlePakkettenDropdownMouseEnter = () => {
    if (pakkettenCloseTimeoutRef.current) {
      clearTimeout(pakkettenCloseTimeoutRef.current);
      pakkettenCloseTimeoutRef.current = null;
    }
    setIsPakkettenDropdownOpen(true);
  };

  const handlePakkettenDropdownMouseLeave = () => {
    pakkettenCloseTimeoutRef.current = setTimeout(() => {
      setIsPakkettenDropdownOpen(false);
    }, 150);
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMobileMenu}>
            <Image
              src="/Gemini_Generated_Image_3xrqk63xrqk63xrq-removebg-preview (1).png"
              alt="Quality-Drive Rijschool"
              width={200}
              height={60}
              priority
              className={styles.logoImage}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className={styles.navLinks}>
          {/* Pakketten Dropdown */}
          <div
            className={styles.navDropdown}
            ref={pakkettenDropdownRef}
            onMouseEnter={handlePakkettenDropdownMouseEnter}
            onMouseLeave={handlePakkettenDropdownMouseLeave}
          >
            <Link href="/rijles-pakketten" className={styles.navDropdownButton}>
              Pakketten
              <svg
                className={`${styles.dropdownArrow} ${isPakkettenDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>

            {isPakkettenDropdownOpen && (
              <div className={styles.navDropdownMenu}>
                <Link href="/auto-pakketten" onClick={() => setIsPakkettenDropdownOpen(false)}>Auto pakketten</Link>
                <Link href="/motor-pakketten" onClick={() => setIsPakkettenDropdownOpen(false)}>Motor pakketten</Link>
              </div>
            )}
          </div>

          <Link href="/theorie">Theorie</Link>

          {/* Over ons Dropdown */}
          <div
            className={styles.navDropdown}
            ref={aboutDropdownRef}
            onMouseEnter={handleAboutDropdownMouseEnter}
            onMouseLeave={handleAboutDropdownMouseLeave}
          >
            <Link href="/about" className={styles.navDropdownButton}>
              Over ons
              <svg
                className={`${styles.dropdownArrow} ${isAboutDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>

            {isAboutDropdownOpen && (
              <div className={styles.navDropdownMenu}>
                <Link href="/about" onClick={() => setIsAboutDropdownOpen(false)}>Over ons</Link>
                <Link href="/about#team" onClick={() => setIsAboutDropdownOpen(false)}>Team</Link>
                <Link href="/about#reviews" onClick={() => setIsAboutDropdownOpen(false)}>Reviews</Link>
                <Link href="/veelgestelde-vragen" onClick={() => setIsAboutDropdownOpen(false)}>Veelgestelde vragen</Link>
              </div>
            )}
          </div>

          {/* Rijopleidingen Dropdown */}
          <div
            className={styles.navDropdown}
            ref={rijopleidingenDropdownRef}
            onMouseEnter={handleRijopleidingenDropdownMouseEnter}
            onMouseLeave={handleRijopleidingenDropdownMouseLeave}
          >
            <Link href="/rijopleidingen" className={styles.navDropdownButton}>
              Rijopleidingen
              <svg
                className={`${styles.dropdownArrow} ${isRijopleidingenDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </Link>

            {isRijopleidingenDropdownOpen && (
              <div className={styles.navMegaMenu}>
                <div className={styles.megaMenuSection}>
                  <div className={styles.megaMenuTitle}>Autorijles</div>
                  <Link href="/autorijles" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Algemeen</Link>
                  <Link href="/rijschool-den-haag" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Den Haag</Link>
                  <Link href="/rijschool-zoetermeer" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Zoetermeer</Link>
                  <Link href="/rijschool-delft" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Delft</Link>
                  <Link href="/rijschool-rijswijk" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijswijk</Link>
                  <Link href="/rijschool-voorburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Voorburg</Link>
                  <Link href="/rijschool-nootdorp" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Nootdorp</Link>
                  <Link href="/rijschool-berkel-en-rodenrijs" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Berkel en Rodenrijs</Link>
                  <Link href="/rijschool-bergschenhoek" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Bergschenhoek</Link>
                  <Link href="/rijschool-bleiswijk" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Bleiswijk</Link>
                  <Link href="/rijschool-lansingerland" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Lansingerland</Link>
                  <Link href="/rijschool-wateringen" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Wateringen</Link>
                </div>

                <div className={styles.megaMenuSection}>
                  <div className={styles.megaMenuTitle}>Motorrijles</div>
                  <Link href="/motorrijles" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Algemeen</Link>
                  <Link href="/motorrijschool-den-haag" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Den Haag</Link>
                  <Link href="/motorrijschool-zoetermeer" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Zoetermeer</Link>
                  <Link href="/motorrijschool-delft" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Delft</Link>
                  <Link href="/motorrijschool-rijswijk" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijswijk</Link>
                  <Link href="/motorrijschool-voorburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Voorburg</Link>
                  <Link href="/motorrijschool-nootdorp" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Nootdorp</Link>
                  <Link href="/motorrijschool-lansingerland" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Lansingerland</Link>
                  <Link href="/motorrijschool-wateringen" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Wateringen</Link>
                  <Link href="/motorrijschool-leidschenveen" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Leidschenveen</Link>
                  <Link href="/motorrijschool-ypenburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Ypenburg</Link>
                </div>

                <div className={styles.megaMenuSection}>
                  <div className={styles.megaMenuTitle}>Automaat rijles</div>
                  <Link href="/automaat-rijles" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Algemeen</Link>
                  <Link href="/rijschool-automaat-delft" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Delft</Link>
                  <Link href="/rijschool-automaat-den-haag" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Den Haag</Link>
                  <Link href="/rijschool-automaat-nootdorp" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Nootdorp</Link>
                  <Link href="/rijschool-automaat-voorburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Voorburg</Link>
                  <Link href="/rijschool-automaat-zoetermeer" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Zoetermeer</Link>
                </div>

                <div className={styles.megaMenuSection}>
                  <div className={styles.megaMenuTitle}>Taxi rijles</div>
                  <Link href="/taxi-rijles" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Algemeen</Link>
                  <Link href="/taxi-rijles/delft" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Delft</Link>
                  <Link href="/taxi-rijles/den-haag" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Den Haag</Link>
                  <Link href="/taxi-rijles/lansingerland" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Lansingerland</Link>
                  <Link href="/taxi-rijles/leidschenveen" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Leidschenveen</Link>
                  <Link href="/taxi-rijles/nootdorp" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Nootdorp</Link>
                  <Link href="/taxi-rijles/rijswijk" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijswijk</Link>
                  <Link href="/taxi-rijles/voorburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Voorburg</Link>
                  <Link href="/taxi-rijles/wateringen" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Wateringen</Link>
                  <Link href="/taxi-rijles/ypenburg" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Ypenburg</Link>
                  <Link href="/taxi-rijles/zoetermeer" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Zoetermeer</Link>
                </div>

                <div className={styles.megaMenuSection}>
                  <div className={styles.megaMenuTitle}>Overige</div>
                  <Link href="/rijschool-adhd" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijschool ADHD</Link>
                  <Link href="/rijschool-faalangst" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijschool Faalangst</Link>
                  <Link href="/rijschool-add" onClick={() => setIsRijopleidingenDropdownOpen(false)}>Rijschool ADD</Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${isMobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <div className={styles.mobileMenuContent}>
          <Link href="/rijles-pakketten" onClick={closeMobileMenu}>Pakketten</Link>
          <Link href="/theorie" onClick={closeMobileMenu}>Theorie</Link>

          {/* Over ons Mobile Dropdown */}
          <div className={styles.mobileMenuDropdown}>
            <button
              className={styles.mobileMenuDropdownButton}
              onClick={() => setIsAboutDropdownOpen(!isAboutDropdownOpen)}
            >
              Over ons
              <svg
                className={`${styles.dropdownArrow} ${isAboutDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isAboutDropdownOpen && (
              <div className={styles.mobileMenuDropdownItems}>
                <Link href="/about" onClick={closeMobileMenu}>Over ons</Link>
                <Link href="/about#team" onClick={closeMobileMenu}>Team</Link>
                <Link href="/about#reviews" onClick={closeMobileMenu}>Reviews</Link>
                <Link href="/veelgestelde-vragen" onClick={closeMobileMenu}>Veelgestelde vragen</Link>
              </div>
            )}
          </div>

          {/* Rijopleidingen Mobile Dropdown */}
          <div className={styles.mobileMenuDropdown}>
            <button
              className={styles.mobileMenuDropdownButton}
              onClick={() => setIsRijopleidingenDropdownOpen(!isRijopleidingenDropdownOpen)}
            >
              Rijopleidingen
              <svg
                className={`${styles.dropdownArrow} ${isRijopleidingenDropdownOpen ? styles.dropdownArrowOpen : ''}`}
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
              >
                <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            {isRijopleidingenDropdownOpen && (
              <div className={styles.mobileMenuDropdownItems}>
                <Link href="/rijopleidingen" onClick={closeMobileMenu}>Rijopleidingen</Link>
                <div className={styles.mobileMenuSubsection}>
                  <div className={styles.mobileMenuSubtitle}>Autorijles</div>
                  <Link href="/autorijles" onClick={closeMobileMenu}>Algemeen</Link>
                  <Link href="/rijschool-den-haag" onClick={closeMobileMenu}>Den Haag</Link>
                  <Link href="/rijschool-zoetermeer" onClick={closeMobileMenu}>Zoetermeer</Link>
                  <Link href="/rijschool-delft" onClick={closeMobileMenu}>Delft</Link>
                  <Link href="/rijschool-rijswijk" onClick={closeMobileMenu}>Rijswijk</Link>
                  <Link href="/rijschool-voorburg" onClick={closeMobileMenu}>Voorburg</Link>
                  <Link href="/rijschool-nootdorp" onClick={closeMobileMenu}>Nootdorp</Link>
                  <Link href="/rijschool-berkel-en-rodenrijs" onClick={closeMobileMenu}>Berkel en Rodenrijs</Link>
                  <Link href="/rijschool-bergschenhoek" onClick={closeMobileMenu}>Bergschenhoek</Link>
                  <Link href="/rijschool-bleiswijk" onClick={closeMobileMenu}>Bleiswijk</Link>
                  <Link href="/rijschool-lansingerland" onClick={closeMobileMenu}>Lansingerland</Link>
                  <Link href="/rijschool-wateringen" onClick={closeMobileMenu}>Wateringen</Link>
                </div>
                <div className={styles.mobileMenuSubsection}>
                  <div className={styles.mobileMenuSubtitle}>Motorrijles</div>
                  <Link href="/motorrijles" onClick={closeMobileMenu}>Algemeen</Link>
                  <Link href="/motorrijschool-den-haag" onClick={closeMobileMenu}>Den Haag</Link>
                  <Link href="/motorrijschool-zoetermeer" onClick={closeMobileMenu}>Zoetermeer</Link>
                  <Link href="/motorrijschool-delft" onClick={closeMobileMenu}>Delft</Link>
                  <Link href="/motorrijschool-rijswijk" onClick={closeMobileMenu}>Rijswijk</Link>
                  <Link href="/motorrijschool-voorburg" onClick={closeMobileMenu}>Voorburg</Link>
                  <Link href="/motorrijschool-nootdorp" onClick={closeMobileMenu}>Nootdorp</Link>
                  <Link href="/motorrijschool-lansingerland" onClick={closeMobileMenu}>Lansingerland</Link>
                  <Link href="/motorrijschool-wateringen" onClick={closeMobileMenu}>Wateringen</Link>
                  <Link href="/motorrijschool-leidschenveen" onClick={closeMobileMenu}>Leidschenveen</Link>
                  <Link href="/motorrijschool-ypenburg" onClick={closeMobileMenu}>Ypenburg</Link>
                </div>
                <div className={styles.mobileMenuSubsection}>
                  <div className={styles.mobileMenuSubtitle}>Automaat rijles</div>
                  <Link href="/automaat-rijles" onClick={closeMobileMenu}>Algemeen</Link>
                  <Link href="/rijschool-automaat-delft" onClick={closeMobileMenu}>Delft</Link>
                  <Link href="/rijschool-automaat-den-haag" onClick={closeMobileMenu}>Den Haag</Link>
                  <Link href="/rijschool-automaat-nootdorp" onClick={closeMobileMenu}>Nootdorp</Link>
                  <Link href="/rijschool-automaat-voorburg" onClick={closeMobileMenu}>Voorburg</Link>
                  <Link href="/rijschool-automaat-zoetermeer" onClick={closeMobileMenu}>Zoetermeer</Link>
                </div>
                <div className={styles.mobileMenuSubsection}>
                  <div className={styles.mobileMenuSubtitle}>Taxi rijles</div>
                  <Link href="/taxi-rijles" onClick={closeMobileMenu}>Algemeen</Link>
                  <Link href="/taxi-rijles/delft" onClick={closeMobileMenu}>Delft</Link>
                  <Link href="/taxi-rijles/den-haag" onClick={closeMobileMenu}>Den Haag</Link>
                  <Link href="/taxi-rijles/lansingerland" onClick={closeMobileMenu}>Lansingerland</Link>
                  <Link href="/taxi-rijles/leidschenveen" onClick={closeMobileMenu}>Leidschenveen</Link>
                  <Link href="/taxi-rijles/nootdorp" onClick={closeMobileMenu}>Nootdorp</Link>
                  <Link href="/taxi-rijles/rijswijk" onClick={closeMobileMenu}>Rijswijk</Link>
                  <Link href="/taxi-rijles/voorburg" onClick={closeMobileMenu}>Voorburg</Link>
                  <Link href="/taxi-rijles/wateringen" onClick={closeMobileMenu}>Wateringen</Link>
                  <Link href="/taxi-rijles/ypenburg" onClick={closeMobileMenu}>Ypenburg</Link>
                  <Link href="/taxi-rijles/zoetermeer" onClick={closeMobileMenu}>Zoetermeer</Link>
                </div>
                <div className={styles.mobileMenuSubsection}>
                  <div className={styles.mobileMenuSubtitle}>Overige</div>
                  <Link href="/rijschool-adhd" onClick={closeMobileMenu}>Rijschool ADHD</Link>
                  <Link href="/rijschool-faalangst" onClick={closeMobileMenu}>Rijschool Faalangst</Link>
                  <Link href="/rijschool-add" onClick={closeMobileMenu}>Rijschool ADD</Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
          <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
        </div>
      </div>
    </nav>
  );
}
