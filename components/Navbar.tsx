import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Phone, Mail } from 'lucide-react';
import styles from './Navbar.module.css';
import CartBadge from './CartBadge';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  return (
    <header className={styles.header}>
      {/* Top Bar */}
      <div className={styles.topBar}>
        <div className={`container ${styles.topBarContainer}`}>
          <a href="tel:2053040178" className={styles.topBarLink}>
            <Phone size={14} /> (205) 304-0178
          </a>
          <a href="mailto:contact@premiergolfcartssale.com" className={styles.topBarLink}>
            <Mail size={14} /> contact@premiergolfcartssale.com
          </a>
        </div>
      </div>

      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <Image src="/golf-logo.png" alt="Premier Golf Carts" width={40} height={40} priority />
          <span>PREMIER <span className={styles.logoAccent}>CARTS</span></span>
        </Link>
        
        <nav className={styles.desktopNav}>
          <Link href="/shop" className={styles.navLink}>Inventory</Link>
          <Link href="/custom-build" className={styles.navLink}>Custom Builds</Link>
          <Link href="/about" className={styles.navLink}>About Us</Link>
          <Link href="/contact" className={styles.navLink}>Contact</Link>
        </nav>

        <div className={styles.navActions}>
          <Link href="/cart" className={styles.cartBtn} aria-label="Cart">
            <ShoppingCart size={20} />
            <CartBadge />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
