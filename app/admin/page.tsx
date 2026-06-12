import Link from 'next/link';
import { Package, ShoppingCart, MessageSquare, DollarSign, ArrowRight, Plus } from 'lucide-react';
import styles from './admin.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: productCount },
    { count: orderCount },
    { count: inquiryCount },
    { data: recentOrders },
    { data: recentInquiries },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('*', { count: 'exact', head: true }),
    supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
    supabase.from('orders').select('id, customer_name, customer_email, total_price, payment_method, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('contact_submissions').select('id, name, email, cart_model_interest, created_at').order('created_at', { ascending: false }).limit(5),
  ]);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard</h1>
          <p className={styles.pageSub}>Welcome back — here&apos;s what&apos;s happening.</p>
        </div>
        <Link href="/admin/products/new" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* ── Stat cards ── */}
      <div className={styles.statsGrid}>
        {[
          { icon: <Package size={20} />, value: productCount ?? 0, label: 'Total Products',  color: styles.statIconBlue   },
          { icon: <ShoppingCart size={20} />, value: orderCount ?? 0,   label: 'Total Orders',    color: styles.statIconGold   },
          { icon: <MessageSquare size={20} />, value: inquiryCount ?? 0, label: 'Inquiries',        color: styles.statIconGreen  },
          { icon: <DollarSign size={20} />, value: '$0',              label: 'Revenue (YTD)',   color: styles.statIconPurple },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={`${styles.statIconWrap} ${s.color}`}>{s.icon}</div>
            <div>
              <div className={styles.statValue}>{s.value}</div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Recent Orders ── */}
      <div className={styles.tableCard} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.tableTopbar}>
          <span className={styles.tableTitle}>Recent Orders</span>
          <Link href="/admin/orders" className={styles.actionLink} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            View All <ArrowRight size={13} />
          </Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Total</th>
              <th>Payment</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders && recentOrders.length > 0 ? recentOrders.map(o => (
              <tr key={o.id}>
                <td style={{ fontWeight: 600 }}>{o.customer_name}</td>
                <td style={{ color: '#64748b' }}>{o.customer_email}</td>
                <td style={{ fontWeight: 600 }}>${Number(o.total_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td><span className={styles.catBadge}>{o.payment_method}</span></td>
                <td style={{ color: '#94a3b8' }}>{new Date(o.created_at).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr className={styles.emptyRow}><td colSpan={5}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ── Recent Inquiries ── */}
      <div className={styles.tableCard}>
        <div className={styles.tableTopbar}>
          <span className={styles.tableTitle}>Recent Inquiries</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Interest</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {recentInquiries && recentInquiries.length > 0 ? recentInquiries.map(r => (
              <tr key={r.id}>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td style={{ color: '#64748b' }}>{r.email}</td>
                <td><span className={styles.catBadge}>{r.cart_model_interest || '—'}</span></td>
                <td style={{ color: '#94a3b8' }}>{new Date(r.created_at).toLocaleDateString()}</td>
              </tr>
            )) : (
              <tr className={styles.emptyRow}><td colSpan={4}>No inquiries yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
