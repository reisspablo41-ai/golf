import styles from '../admin.module.css';
import { createAdminClient } from '@/utils/supabase/admin';
import AdminOrderStatusSelect from '@/components/AdminOrderStatusSelect';

const STATUS_COLORS: Record<string, string> = {
  pending:    '#ca8a04',
  processing: '#2563eb',
  shipped:    '#7c3aed',
  delivered:  '#16a34a',
  cancelled:  '#dc2626',
};
const STATUS_BG: Record<string, string> = {
  pending:    '#fefce8',
  processing: '#eff6ff',
  shipped:    '#faf5ff',
  delivered:  '#f0fdf4',
  cancelled:  '#fef2f2',
};

export default async function AdminOrdersPage() {
  const admin = createAdminClient();
  const { data: orders } = await admin
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false });

  const all = orders || [];
  const totalRevenue = all
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + Number(o.total_amount || 0), 0);

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Orders</h1>
          <p className={styles.pageSub}>{all.length} order{all.length !== 1 ? 's' : ''} · ${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })} total revenue</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
        {[
          { label: 'Pending',    count: all.filter(o => o.status === 'pending').length,    color: STATUS_COLORS.pending },
          { label: 'Processing', count: all.filter(o => o.status === 'processing').length, color: STATUS_COLORS.processing },
          { label: 'Shipped',    count: all.filter(o => o.status === 'shipped').length,    color: STATUS_COLORS.shipped },
          { label: 'Delivered',  count: all.filter(o => o.status === 'delivered').length,  color: STATUS_COLORS.delivered },
        ].map(s => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statIconWrap} style={{ background: `${s.color}18`, color: s.color }}>
              <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>{s.count}</span>
            </div>
            <div>
              <div className={styles.statLabel}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableTopbar}>
          <span className={styles.tableTitle}>All Orders</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {all.length > 0 ? all.map(order => {
              const addr = order.shipping_address || {};
              const name = addr.name || '—';
              const payment = addr.payment_method || '—';
              return (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>
                    #{String(order.id).slice(0, 8).toUpperCase()}
                  </td>
                  <td style={{ fontWeight: 600 }}>{name}</td>
                  <td style={{ color: '#64748b' }}>{order.customer_email}</td>
                  <td>
                    <span className={styles.catBadge} style={{ textTransform: 'capitalize' }}>{payment}</span>
                  </td>
                  <td style={{ fontWeight: 700 }}>
                    ${Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </td>
                  <td>
                    <AdminOrderStatusSelect orderId={order.id} currentStatus={order.status || 'pending'} />
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                </tr>
              );
            }) : (
              <tr className={styles.emptyRow}><td colSpan={7}>No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
