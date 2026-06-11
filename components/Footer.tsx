import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div>
          <Link href="/" className={styles.logo}>
            PREMIER <span className={styles.logoAccent}>CARTS</span>
          </Link>
          <p className={styles.description}>
            Your premium destination for custom and street-legal golf carts. 
            Built for performance, designed for style.
          </p>
        </div>
        
        <div>
          <h3 className={styles.columnTitle}>Shop</h3>
          <ul className={styles.linkList}>
            <li><Link href="/shop?category=electric">Electric Carts</Link></li>
            <li><Link href="/shop?category=gas">Gas Carts</Link></li>
            <li><Link href="/shop?category=custom">Custom Builds</Link></li>
            <li><Link href="/shop?category=parts">Parts & Accessories</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Company</h3>
          <ul className={styles.linkList}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <li><Link href="/refund-policy">Refund Policy</Link></li>
            <li><Link href="/privacy-policy">Privacy Policy</Link></li>
            <li><Link href="/terms">Terms & Conditions</Link></li>
          </ul>
        </div>

        <div>
          <h3 className={styles.columnTitle}>Contact</h3>
          <ul className={styles.linkList}>
            <li>contact@premiergolfcartssale.com</li>
            <li>(205) 304-0178</li>
          </ul>
        </div>
      </div>
      
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} Premier Golf Carts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
