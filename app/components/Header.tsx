'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

// Build timestamp: 2025-11-06-19-35 - NO LOGIN BUTTONS

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
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
          <Link href="/#pakketten" scroll={true}>Pakketten</Link>
          <Link href="/#theorie" scroll={true}>Theorie</Link>
          <Link href="/about">Over ons</Link>
          <Link href="/#rijopleidingen" scroll={true}>Rijopleidingen</Link>
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
          <Link href="/#pakketten" onClick={closeMobileMenu} scroll={true}>Pakketten</Link>
          <Link href="/#theorie" onClick={closeMobileMenu} scroll={true}>Theorie</Link>
          <Link href="/about" onClick={closeMobileMenu}>Over ons</Link>
          <Link href="/#rijopleidingen" onClick={closeMobileMenu} scroll={true}>Rijopleidingen</Link>
          <Link href="/contact" onClick={closeMobileMenu}>Contact</Link>
          <Link href="/blog" onClick={closeMobileMenu}>Blog</Link>
        </div>
      </div>
    </nav>
  );
}
