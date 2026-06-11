'use client';

import { useCart } from './CartContext';
import styles from './Navbar.module.css';

export default function CartBadge() {
  const { count } = useCart();
  if (count === 0) return <span className={styles.cartCount}>0</span>;
  return <span className={styles.cartCount}>{count > 99 ? '99+' : count}</span>;
}
