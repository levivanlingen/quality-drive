"use client";

import { useState } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { HeroSection } from "@/app/components/sections";
import styles from "../page.module.css";
import contactStyles from "./contact.module.css";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    naam: "",
    email: "",
    telefoon: "",
    bericht: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
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
      setSubmitStatus("success");
      setFormData({
        naam: "",
        email: "",
        telefoon: "",
        bericht: "",
      });

      // Reset success message na 5 seconden
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }, 1000);
  };

  return (
    <div className={styles.page}>
      <Header />

      <HeroSection
        title="Contact"
        subtitle="Neem contact met ons op voor vragen of een proefles"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      {/* Contact Form Section */}
      <section className={styles.rijschoolSection}>
        <div className={styles.rijschoolContent}>
          <h2 className={styles.sectionHeaderTitle}>Kom met ons in contact</h2>
          <p className={styles.rijschoolText}>
            Vul het formulier in en we nemen zo snel mogelijk contact met je op.
            Je kunt ook direct bellen of mailen via onderstaande
            contactgegevens.
          </p>

          <div className={contactStyles.contactGrid}>
            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              <div className={contactStyles.formContainer}>
                {/* Naam */}
                <div className={contactStyles.formField}>
                  <label className={contactStyles.formLabel}>Naam *</label>
                  <input
                    type="text"
                    name="naam"
                    value={formData.naam}
                    onChange={handleChange}
                    required
                    placeholder="Je volledige naam"
                    className={contactStyles.formInput}
                  />
                </div>

                {/* Email en Telefoon */}
                <div className={contactStyles.formFieldsGrid}>
                  <div>
                    <label className={contactStyles.formLabel}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="je@email.nl"
                      className={contactStyles.formInput}
                    />
                  </div>

                  <div>
                    <label className={contactStyles.formLabel}>Telefoon</label>
                    <input
                      type="tel"
                      name="telefoon"
                      value={formData.telefoon}
                      onChange={handleChange}
                      placeholder="06 12345678"
                      className={contactStyles.formInput}
                    />
                  </div>
                </div>

                {/* Bericht */}
                <div className={contactStyles.formField}>
                  <label className={contactStyles.formLabel}>Bericht *</label>
                  <textarea
                    name="bericht"
                    value={formData.bericht}
                    onChange={handleChange}
                    required
                    rows={8}
                    placeholder="Typ hier je vraag of bericht..."
                    className={contactStyles.formTextarea}
                  />
                </div>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <div className={contactStyles.successMessage}>
                    ✓ Bedankt voor je bericht! We nemen zo snel mogelijk contact
                    met je op.
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={contactStyles.submitButton}
                >
                  {isSubmitting ? "Bezig met versturen..." : "Verstuur Bericht"}
                </button>
              </div>
            </form>

            {/* Sidebar: Openingstijden en Map */}
            <div className={contactStyles.sidebarContainer}>
              {/* Openingstijden */}
              <div className={contactStyles.sidebarCard}>
                <h3 className={contactStyles.sidebarTitle}>Openingstijden</h3>

                <div className={contactStyles.hoursContainer}>
                  <div className={contactStyles.hoursItem}>
                    <Clock
                      size={24}
                      strokeWidth={1.5}
                      className={contactStyles.hoursIcon}
                    />
                    <div className={contactStyles.hoursContent}>
                      <div className={contactStyles.hoursDay}>Ma t/m Vrij:</div>
                      <div className={contactStyles.hoursTime}>
                        09:00 - 20:00
                      </div>
                    </div>
                  </div>

                  <div className={contactStyles.hoursItem}>
                    <Clock
                      size={24}
                      strokeWidth={1.5}
                      className={contactStyles.hoursIcon}
                    />
                    <div className={contactStyles.hoursContent}>
                      <div className={contactStyles.hoursDay}>Za t/m Zo:</div>
                      <div className={contactStyles.hoursTime}>
                        11:00 - 16:00
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Google Maps */}
              <div className={contactStyles.sidebarCardFull}>
                <h3 className={contactStyles.sidebarTitle}>Adres</h3>
                <div className={contactStyles.mapContainer}>
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
                <div className={contactStyles.mapAddress}>
                  <strong className={contactStyles.mapAddressName}>
                    Quality-Drive
                  </strong>
                  <br />
                  Laurens Reaelstraat 123
                  <br />
                  2595 XL Den Haag
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section
        className={styles.services}
        style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
      >
        <h2 className={styles.sectionHeaderTitle}>Contactmogelijkheden</h2>
        <p className={styles.sectionHeaderSubtitle}>
          Kies de manier die jou het beste uitkomt
        </p>

        <div className={styles.serviceGrid}>
          {/* Telefoon */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Phone size={40} strokeWidth={1.5} />
            </div>
            <h3>Bel Ons Direct</h3>
            <p>
              Bereikbaar van maandag tot vrijdag tussen 9:00 en 18:00 uur voor
              al je vragen over rijlessen.
            </p>
            <span className={styles.serviceLink} style={{ cursor: "default" }}>
              +31 6 20817325 →
            </span>
          </div>

          {/* Email */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <Mail size={40} strokeWidth={1.5} />
            </div>
            <h3>Stuur een Email</h3>
            <p>
              Mail ons en we reageren binnen 24 uur. Perfect voor uitgebreidere
              vragen.
            </p>
            <span className={styles.serviceLink} style={{ cursor: "default" }}>
              info@quality-drive.nl →
            </span>
          </div>

          {/* Locatie */}
          <div className={styles.serviceCard}>
            <div className={styles.serviceIcon}>
              <MapPin size={40} strokeWidth={1.5} />
            </div>
            <h3>Onze Locatie</h3>
            <p>
              Gevestigd in Den Haag, actief in heel Zuid-Holland waaronder
              Zoetermeer, Delft en Rijswijk.
            </p>
            <span className={styles.serviceLink} style={{ cursor: "default" }}>
              Laurens Reaelstraat 123 →
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
