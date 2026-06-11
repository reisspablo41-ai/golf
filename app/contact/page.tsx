import { MapPin, Phone, Mail } from 'lucide-react';
import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem' }}>
      <h1 className={styles.title}>Contact Us</h1>
      <p className={styles.subtitle}>
        Have questions about a custom build, parts, or an existing order? Our team is here to help.
      </p>

      <div className={styles.contactLayout}>
        <div className={styles.contactInfo}>
          <div className={styles.infoCard}>
            <Phone className={styles.icon} size={24} />
            <div>
              <h3>Sales & Support</h3>
              <p>(205) 304-0178<br />Mon-Fri: 9am - 6pm EST</p>
            </div>
          </div>
          <div className={styles.infoCard}>
            <Mail className={styles.icon} size={24} />
            <div>
              <h3>Email Us</h3>
              <p>contact@premiergolfcartssale.com<br />Expected response: 24hrs</p>
            </div>
          </div>
        </div>

        <div className={styles.formContainer}>
          <h2>Send a Message</h2>
          <form className={styles.contactForm}>
            <div className={styles.inputGroup}>
              <label htmlFor="name">Full Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            
            <div className={styles.inputGroup}>
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="phone">Phone Number (Optional)</label>
              <input type="tel" id="phone" name="phone" />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="interest">Model of Interest</label>
              <select id="interest" name="interest">
                <option value="">Select a model...</option>
                <option value="phantom">Phantom X-Series</option>
                <option value="timberwolf">Timberwolf Gas</option>
                <option value="apex">Apex Custom Lifted</option>
                <option value="parts">Parts/Accessories Only</option>
                <option value="other">Other / General Inquiry</option>
              </select>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows={5} required></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
}
