'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';

export default function Header() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContent}>
        <div className={styles.logo}>
          <Link href="/">
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
        <div className={styles.navLinks}>
          <a href="/#pakketten">Pakketten</a>
          <a href="/#theorie">Theorie</a>
          <Link href="/about">Over ons</Link>
          <a href="/#rijopleidingen">Rijopleidingen</a>
          <Link href="/contact">Contact</Link>
          <Link href="/blog">Blog</Link>
          <button className={styles.navButton}>Log in</button>
          <button className={styles.navButtonPrimary}>Aanmelden</button>
        </div>
      </div>
    </nav>
  );
}
