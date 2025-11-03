'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from '../page.module.css';
import { FaWhatsapp, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTiktok, FaLinkedin } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        {/* Logo & Info Section */}
        <div className={styles.footerSection}>
          <div className={styles.footerLogo}>
            <Image
              src="/Gemini_Generated_Image_3xrqk63xrqk63xrq-removebg-preview (1).png"
              alt="Quality Drive Logo"
              width={200}
              height={80}
              style={{ objectFit: 'contain' }}
            />
          </div>
          <p className={styles.footerDescription}>
            Bij Quality-Drive geven we alleen kwaliteitsvolle lessen met oprechte aandacht en tijd voor elke leerling, zodat jij met vertrouwen je CBR-examen succesvol behaalt.
          </p>
          <div className={styles.footerSocial}>
            <a href="https://www.facebook.com/people/Quality-Drive/100068937065596/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook size={24} />
            </a>
            <a href="https://www.instagram.com/quality.drive/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.tiktok.com/@auto.motorqualityd" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok size={24} />
            </a>
            <a href="https://www.linkedin.com/in/quality-drive-autorijschool-beste-goedkope-rijschool-den-haag-zoetermeer-berkelenrodenrijs-nootdorp-/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin size={24} />
            </a>
            <a href="https://api.whatsapp.com/send?phone=31620817325&text=Beste%20Quality-Drive%2C%20Ik%20ben%20ge%C3%AFnteresseerd.%20Zouden%20jullie%20contact%20met%20mij%20willen%20opnemen%20in%20verband%20met%20rijlessen%3F" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>

        {/* Menu Section */}
        <div className={styles.footerSection}>
          <h4>Menu</h4>
          <Link href="/pakketten">Pakketten</Link>
          <Link href="/theorie">Theorie</Link>
          <Link href="/rijschool-add">Rijschool voor ADD</Link>
          <Link href="/rijschool-adhd">Rijschool voor ADHD</Link>
          <Link href="/rijschool-faalangst">Rijschool voor faalangst</Link>
        </div>

        {/* Locaties Section 1 */}
        <div className={styles.footerSection}>
          <h4>Locaties</h4>
          <Link href="/rijschool-den-haag">Den Haag</Link>
          <Link href="/rijschool-zoetermeer">Zoetermeer</Link>
          <Link href="/rijschool-delft">Delft</Link>
          <Link href="/rijschool-rijswijk">Rijswijk</Link>
          <Link href="/rijschool-voorburg">Voorburg</Link>
        </div>

        {/* Locaties Section 2 */}
        <div className={styles.footerSection}>
          <h4>Locaties</h4>
          <Link href="/rijschool-nootdorp">Nootdorp</Link>
          <Link href="/rijschool-berkel-en-rodenrijs">Berkel en Rodenrijs</Link>
          <Link href="/rijschool-bergschenhoek">Bergschenhoek</Link>
          <Link href="/rijschool-bleiswijk">Bleiswijk</Link>
          <Link href="/rijschool-lansingerland">Lansingerland</Link>
        </div>

        {/* Quality Drive Section */}
        <div className={styles.footerSection}>
          <h4>Quality Drive</h4>
          <Link href="/contact">Contact</Link>
          <Link href="/vacature">Vacature</Link>
          <Link href="/veelgestelde-vragen">Veelgestelde vragen</Link>
          <Link href="/reviews">Reviews</Link>
          <Link href="/blog">blog</Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div>
          <p>© {new Date().getFullYear()} Quality Drive. Alle rechten voorbehouden.</p>
        </div>
        <div className={styles.footerBuiltBy}>
          Build by <a href="https://levivl.nl" target="_blank" rel="noopener noreferrer">levivl.nl</a>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/privacy">Privacy</Link>
          <Link href="/algemene-voorwaarden">Algemene Voorwaarden</Link>
          <Link href="/cookies">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
