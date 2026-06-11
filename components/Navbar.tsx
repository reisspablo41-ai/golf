import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu } from 'lucide-react';
import styles from './Navbar.module.css';
import CartBadge from './CartBadge';

export default function Navbar() {
  return (
    <header className={styles.header}>
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
          <button className={styles.mobileMenuBtn} aria-label="Menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
}
