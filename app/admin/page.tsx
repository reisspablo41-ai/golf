import styles from './admin.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function AdminDashboard() {
  const supabase = await createClient();
  
  // Fetch high-level stats
  const { count: productCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
  const { count: orderCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
  const { count: inquiryCount } = await supabase.from('contact_submissions').select('*', { count: 'exact', head: true });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard Overview</h1>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Products</div>
          <div className={styles.statValue}>{productCount || 0}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Total Orders</div>
          <div className={styles.statValue}>{orderCount || 0}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>New Inquiries</div>
          <div className={styles.statValue}>{inquiryCount || 0}</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statLabel}>Revenue (YTD)</div>
          <div className={styles.statValue}>$0.00</div>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Recent Inquiries</th>
              <th>Email</th>
              <th>Model Interest</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={4} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No recent inquiries.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
