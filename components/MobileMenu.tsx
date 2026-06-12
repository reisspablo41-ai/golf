'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import styles from './MobileMenu.module.css';

const links = [
  { href: '/shop',         label: 'Inventory' },
  { href: '/custom-build', label: 'Custom Builds' },
  { href: '/about',        label: 'About Us' },
  { href: '/contact',      label: 'Contact' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.trigger}
        aria-label={open ? 'Close menu' : 'Open menu'}
        onClick={() => setOpen(o => !o)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <>
          <div className={styles.overlay} onClick={() => setOpen(false)} />
          <nav className={styles.drawer}>
            {links.map(l => (
              <Link
                key={l.href}
                href={l.href}
                className={styles.drawerLink}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </>
      )}
    </>
  );
}
