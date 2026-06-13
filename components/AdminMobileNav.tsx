'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import styles from './AdminMobileNav.module.css';

const NAV = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard, exact: true  },
  { href: '/admin/products',  label: 'Products',  icon: Package,          exact: false },
  { href: '/admin/orders',    label: 'Orders',    icon: ShoppingCart,     exact: false },
  { href: '/admin/customers', label: 'Customers', icon: Users,            exact: false },
  { href: '/admin/settings',  label: 'Settings',  icon: Settings,         exact: false },
];

export default function AdminMobileNav() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className={styles.mobileNav}>
      <div className={styles.scroll}>
        {NAV.map(({ href, label, icon: Icon, exact }) => (
          <Link
            key={href}
            href={href}
            className={`${styles.item} ${isActive(href, exact) ? styles.itemActive : ''}`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
