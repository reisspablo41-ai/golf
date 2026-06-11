import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut } from 'lucide-react';
import styles from './admin.module.css';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get('admin_auth');
  const isAdmin = authCookie?.value === process.env.ADMIN_PASSWORD;

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2>Admin Panel</h2>
        </div>
        <nav className={styles.sidebarNav}>
          <Link href="/admin" className={styles.navLink}><LayoutDashboard size={20} /> Dashboard</Link>
          <Link href="/admin/orders" className={styles.navLink}><ShoppingCart size={20} /> Orders</Link>
          <Link href="/admin/products" className={styles.navLink}><Package size={20} /> Products</Link>
          <Link href="/admin/customers" className={styles.navLink}><Users size={20} /> Customers</Link>
          <Link href="/admin/settings" className={styles.navLink}><Settings size={20} /> Settings</Link>
        </nav>
        <div className={styles.sidebarFooter}>
          <form action={async () => {
            'use server';
            const cookieStore = await cookies();
            cookieStore.delete('admin_auth');
            redirect('/admin/login');
          }}>
            <button type="submit" className={styles.navLink} style={{ width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}>
              <LogOut size={20} /> Sign Out
            </button>
          </form>
        </div>
      </aside>
      <main className={styles.mainContent}>
        <header className={styles.topHeader}>
          <div className={styles.headerLeft}>
            {/* Breadcrumbs or Title could go here */}
          </div>
          <div className={styles.headerRight}>
            <span className={styles.userEmail}>Administrator</span>
          </div>
        </header>
        <div className={styles.contentArea}>
          {children}
        </div>
      </main>
    </div>
  );
}
