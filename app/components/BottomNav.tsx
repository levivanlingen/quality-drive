'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import styles from './BottomNav.module.css';

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    {
      name: 'Home',
      href: '/',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          <polyline points="9 22 9 12 15 12 15 22"/>
        </svg>
      )
    },
    {
      name: 'Pakketten',
      href: '/#pakketten',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7"/>
          <rect x="14" y="3" width="7" height="7"/>
          <rect x="14" y="14" width="7" height="7"/>
          <rect x="3" y="14" width="7" height="7"/>
        </svg>
      )
    },
    {
      name: 'Rijopleidingen',
      href: '/#rijopleidingen',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="2" x2="12" y2="9"/>
          <line x1="12" y1="15" x2="12" y2="22"/>
          <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"/>
          <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"/>
        </svg>
      )
    },
    {
      name: 'Contact',
      href: '/contact',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      )
    }
  ];

  return (
    <nav className={styles.bottomNav}>
      <div className={styles.navContainer}>
        {navItems.map((item) => {
          // Only mark Home as active when on homepage with no other route
          // Mark other pages/sections as active based on their specific route
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
              scroll={item.href.includes('#')}
            >
              <div className={styles.iconWrapper}>
                {item.icon}
              </div>
              <span className={styles.label}>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
