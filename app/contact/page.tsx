'use client';

import { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import styles from '../page.module.css';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    naam: '',
    email: '',
    telefoon: '',
    onderwerp: '',
    bericht: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simuleer form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        naam: '',
        email: '',
        telefoon: '',
        onderwerp: '',
        bericht: '',
      });

      // Reset success message na 5 seconden
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <Header />

      {/* Contact Form Section */}
      <section className={styles.rijschoolSection} style={{ marginTop: '80px' }}>
        <div className={styles.rijschoolContent}>
          <p className={styles.rijschoolLabel}>Wij helpen je graag</p>
          <h2 className={styles.sectionTitle}>Kom met ons in contact</h2>
          <p className={styles.rijschoolText}>
            Vul het formulier in en we nemen zo snel mogelijk contact met je op.
            Je kunt ook direct bellen of mailen via bovenstaande contactgegevens.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '3rem', alignItems: 'start' }}>
            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              borderRadius: '24px',
              padding: '3rem',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
            }}>
              {/* Naam */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#0065A6',
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                }}>
                  Naam *
                </label>
                <input
                  type="text"
                  name="naam"
                  value={formData.naam}
                  onChange={handleChange}
                  required
                  placeholder="Je volledige naam"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(0, 101, 166, 0.15)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0065A6';
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 101, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 101, 166, 0.15)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Email en Telefoon */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: '#0065A6',
                    fontSize: '1rem',
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                  }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="je@email.nl"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid rgba(0, 101, 166, 0.15)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.7)',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0065A6';
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 101, 166, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 101, 166, 0.15)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '0.75rem',
                    fontWeight: '600',
                    color: '#0065A6',
                    fontSize: '1rem',
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                  }}>
                    Telefoon
                  </label>
                  <input
                    type="tel"
                    name="telefoon"
                    value={formData.telefoon}
                    onChange={handleChange}
                    placeholder="06 12345678"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid rgba(0, 101, 166, 0.15)',
                      borderRadius: '12px',
                      fontSize: '1rem',
                      outline: 'none',
                      background: 'rgba(255, 255, 255, 0.7)',
                      transition: 'all 0.3s ease',
                      fontFamily: 'inherit',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#0065A6';
                      e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(0, 101, 166, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(0, 101, 166, 0.15)';
                      e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              {/* Onderwerp */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#0065A6',
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                }}>
                  Onderwerp *
                </label>
                <select
                  name="onderwerp"
                  value={formData.onderwerp}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(0, 101, 166, 0.15)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0065A6';
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 101, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 101, 166, 0.15)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <option value="">Selecteer een onderwerp</option>
                  <option value="autorijles">Autorijles (handgeschakeld)</option>
                  <option value="automatrijles">Automatrijles</option>
                  <option value="motorrijles">Motorrijles</option>
                  <option value="proefles">Gratis proefles aanvragen</option>
                  <option value="prijzen">Prijzen & Pakketten</option>
                  <option value="examens">Examens & Planning</option>
                  <option value="anders">Anders</option>
                </select>
              </div>

              {/* Bericht */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.75rem',
                  fontWeight: '600',
                  color: '#0065A6',
                  fontSize: '1rem',
                  letterSpacing: '-0.01em',
                  textAlign: 'left',
                }}>
                  Bericht *
                </label>
                <textarea
                  name="bericht"
                  value={formData.bericht}
                  onChange={handleChange}
                  required
                  rows={8}
                  placeholder="Typ hier je vraag of bericht..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid rgba(0, 101, 166, 0.15)',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'rgba(255, 255, 255, 0.7)',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    fontFamily: 'inherit',
                    lineHeight: '1.6',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#0065A6';
                    e.target.style.background = 'rgba(255, 255, 255, 0.9)';
                    e.target.style.boxShadow = '0 0 0 3px rgba(0, 101, 166, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(0, 101, 166, 0.15)';
                    e.target.style.background = 'rgba(255, 255, 255, 0.7)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>

              {/* Success Message */}
              {submitStatus === 'success' && (
                <div style={{
                  padding: '1.25rem 1.5rem',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
                  border: '2px solid rgba(16, 185, 129, 0.3)',
                  borderRadius: '12px',
                  color: '#065f46',
                  textAlign: 'center',
                  fontWeight: '600',
                  marginBottom: '1.5rem',
                  fontSize: '1rem',
                }}>
                  ✓ Bedankt voor je bericht! We nemen zo snel mogelijk contact met je op.
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '1.25rem 2rem',
                  background: isSubmitting ? 'rgba(193, 21, 23, 0.6)' : 'rgba(193, 21, 23, 0.9)',
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '12px',
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 32px rgba(193, 21, 23, 0.3)',
                }}
                onMouseOver={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.background = 'rgba(220, 50, 52, 0.9)';
                    e.currentTarget.style.boxShadow = '0 12px 40px rgba(193, 21, 23, 0.4)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.background = 'rgba(193, 21, 23, 0.9)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(193, 21, 23, 0.3)';
                  }
                }}
              >
                {isSubmitting ? 'Bezig met versturen...' : 'Verstuur Bericht'}
              </button>
            </div>
          </form>

          {/* Sidebar: Openingstijden en Map */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Openingstijden */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              borderRadius: '24px',
              padding: '2rem',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              marginBottom: '2rem',
              flex: '0 0 auto',
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#0065A6',
                textAlign: 'left',
              }}>
                Openingstijden
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                }}>
                  <Clock size={24} strokeWidth={1.5} style={{ marginRight: '1rem', marginTop: '0.25rem', color: '#0065A6', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem', textAlign: 'left' }}>Ma t/m Vrij:</div>
                    <div style={{ fontSize: '0.9rem', color: '#4a5568', textAlign: 'left' }}>09:00 - 20:00</div>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.5)',
                  borderRadius: '12px',
                }}>
                  <Clock size={24} strokeWidth={1.5} style={{ marginRight: '1rem', marginTop: '0.25rem', color: '#0065A6', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#000', marginBottom: '0.25rem', textAlign: 'left' }}>Za t/m Zo:</div>
                    <div style={{ fontSize: '0.9rem', color: '#4a5568', textAlign: 'left' }}>11:00 - 16:00</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Maps */}
            <div style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.2) 100%)',
              backdropFilter: 'blur(30px) saturate(200%)',
              WebkitBackdropFilter: 'blur(30px) saturate(200%)',
              borderRadius: '24px',
              padding: '2rem',
              border: '2px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
            }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                marginBottom: '1.5rem',
                color: '#0065A6',
                textAlign: 'left',
              }}>
                Adres
              </h3>
              <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                flex: '1',
                minHeight: '250px',
              }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2454.8677743!2d4.3035!3d52.0967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b71c1c1c1c1c%3A0x1c1c1c1c1c1c1c1c!2sLaurens%20Reaelstraat%20123%2C%202595%20XL%20Den%20Haag!5e0!3m2!1snl!2snl!4v1699999999999!5m2!1snl!2snl"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Quality-Drive Locatie"
                />
              </div>
              <div style={{
                marginTop: '1rem',
                textAlign: 'left',
                color: '#4a5568',
                fontSize: '0.9rem',
              }}>
                <strong style={{ color: '#0065A6' }}>Quality-Drive</strong><br />
                Laurens Reaelstraat 123<br />
                2595 XL Den Haag
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className={styles.services} style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <h2 className={styles.sectionTitle}>Contactmogelijkheden</h2>
        <p className={styles.sectionSubtitle}>Kies de manier die jou het beste uitkomt</p>

        <div className={styles.serviceGrid}>
          {/* Telefoon */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Phone size={40} strokeWidth={1.5} />
            </div>
            <h3>Bel Ons Direct</h3>
            <p>Bereikbaar van maandag tot vrijdag tussen 9:00 en 18:00 uur voor al je vragen over rijlessen.</p>
            <span className={styles.serviceLink} style={{ cursor: 'default' }}>
              +31 6 20817325 →
            </span>
          </div>

          {/* Email */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Mail size={40} strokeWidth={1.5} />
            </div>
            <h3>Stuur een Email</h3>
            <p>Mail ons en we reageren binnen 24 uur. Perfect voor uitgebreidere vragen.</p>
            <span className={styles.serviceLink} style={{ cursor: 'default' }}>
              info@quality-drive.nl →
            </span>
          </div>

          {/* Locatie */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <h3>Onze Locatie</h3>
            <p>Gevestigd in Den Haag, actief in heel Zuid-Holland waaronder Zoetermeer, Delft en Rijswijk.</p>
            <span className={styles.serviceLink} style={{ cursor: 'default' }}>
              Laurens Reaelstraat 123 →
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
