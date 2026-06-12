'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, Users, Settings } from 'lucide-react';
import styles from '../app/admin/admin.module.css';

const NAV = [
  { href: '/admin',           label: 'Dashboard', icon: LayoutDashboard, exact: true  },
  { href: '/admin/products',  label: 'Products',  icon: Package,          exact: false },
  { href: '/admin/orders',    label: 'Orders',    icon: ShoppingCart,     exact: false },
  { href: '/admin/customers', label: 'Customers', icon: Users,            exact: false },
  { href: '/admin/settings',  label: 'Settings',  icon: Settings,         exact: false },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <nav className={styles.sidebarNav}>
      <span className={styles.navSection}>Main</span>
      {NAV.slice(0, 3).map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.navItem} ${isActive(href, exact) ? styles.navItemActive : ''}`}
        >
          <Icon size={17} />
          {label}
        </Link>
      ))}

      <span className={styles.navSection}>System</span>
      {NAV.slice(3).map(({ href, label, icon: Icon, exact }) => (
        <Link
          key={href}
          href={href}
          className={`${styles.navItem} ${isActive(href, exact) ? styles.navItemActive : ''}`}
        >
          <Icon size={17} />
          {label}
        </Link>
      ))}
    </nav>
  );
}
