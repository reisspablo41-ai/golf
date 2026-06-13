import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Zap, LogOut } from 'lucide-react';
import AdminSidebar from '@/components/AdminSidebar';
import styles from './admin.module.css';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get('admin_auth')?.value === process.env.ADMIN_PASSWORD;

  // Not authenticated — render children bare (the login page).
  // proxy.ts already redirects all other /admin/* paths here, so we
  // never reach this layout for protected pages when unauthenticated.
  if (!isAdmin) return <>{children}</>;

  async function logout() {
    'use server';
    const store = await cookies();
    store.delete('admin_auth');
    redirect('/admin/login');
  }

  return (
    <div className={styles.adminLayout}>

      {/* ── Sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarBrand}>
          <div className={styles.brandIcon}><Zap size={18} /></div>
          <div>
            <div className={styles.brandName}>Premier Carts</div>
            <div className={styles.brandSub}>Admin Console</div>
          </div>
        </div>

        {/* Client nav (needs usePathname for active state) */}
        <AdminSidebar />

        <div className={styles.sidebarFooter}>
          <div className={styles.adminBadge}>
            <div className={styles.adminAvatar}>A</div>
            <div>
              <span className={styles.adminName}>Administrator</span>
              <span className={styles.adminRole}>Super Admin</span>
            </div>
          </div>
          <form action={logout}>
            <button type="submit" className={styles.logoutBtn}>
              <LogOut size={15} /> Sign Out
            </button>
          </form>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className={styles.mainContent}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <Link href="/" className={styles.topbarSep} style={{ textDecoration: 'none', color: 'inherit' }}>
              premiergolfcartssale.com
            </Link>
          </div>
          <div className={styles.topbarRight}>
            <span className={styles.topbarBadge}>Live Site</span>
          </div>
        </header>

        <div className={styles.contentArea}>
          {children}
        </div>
      </main>

    </div>
  );
}
