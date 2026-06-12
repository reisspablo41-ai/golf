import styles from '../admin.module.css';
import { createAdminClient } from '@/utils/supabase/admin';
import { Users, ShoppingCart, MessageSquare } from 'lucide-react';

export default async function AdminCustomersPage() {
  const admin = createAdminClient();

  const [{ data: orders }, { data: inquiries }] = await Promise.all([
    admin.from('orders').select('id, customer_email, customer_phone, total_amount, status, created_at, shipping_address').order('created_at', { ascending: false }),
    admin.from('contact_submissions').select('id, name, email, phone, cart_model_interest, message, status, created_at').order('created_at', { ascending: false }),
  ]);

  // Build a unified customer map keyed by email
  type CustomerRecord = {
    email: string;
    name: string;
    phone: string;
    orders: typeof orders;
    inquiries: typeof inquiries;
    lastSeen: string;
    totalSpend: number;
  };

  const customerMap = new Map<string, CustomerRecord>();

  for (const o of orders || []) {
    const email = o.customer_email;
    const addr = o.shipping_address || {};
    const existing = customerMap.get(email);
    if (existing) {
      existing.orders!.push(o);
      existing.totalSpend += Number(o.total_amount || 0);
      if (o.created_at > existing.lastSeen) existing.lastSeen = o.created_at;
    } else {
      customerMap.set(email, {
        email,
        name: addr.name || email,
        phone: o.customer_phone || '',
        orders: [o],
        inquiries: [],
        lastSeen: o.created_at,
        totalSpend: Number(o.total_amount || 0),
      });
    }
  }

  for (const inq of inquiries || []) {
    const email = inq.email;
    const existing = customerMap.get(email);
    if (existing) {
      existing.inquiries!.push(inq);
      if (!existing.name || existing.name === email) existing.name = inq.name;
      if (!existing.phone) existing.phone = inq.phone || '';
      if (inq.created_at > existing.lastSeen) existing.lastSeen = inq.created_at;
    } else {
      customerMap.set(email, {
        email,
        name: inq.name,
        phone: inq.phone || '',
        orders: [],
        inquiries: [inq],
        lastSeen: inq.created_at,
        totalSpend: 0,
      });
    }
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime()
  );

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Customers</h1>
          <p className={styles.pageSub}>{customers.length} unique contact{customers.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      <div className={styles.statsGrid} style={{ marginBottom: '1.5rem' }}>
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.statIconBlue}`}><Users size={20} /></div>
          <div><div className={styles.statValue}>{customers.length}</div><div className={styles.statLabel}>Total Customers</div></div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.statIconGold}`}><ShoppingCart size={20} /></div>
          <div><div className={styles.statValue}>{customers.filter(c => c.orders!.length > 0).length}</div><div className={styles.statLabel}>With Orders</div></div>
        </div>
        <div className={styles.statCard}>
          <div className={`${styles.statIconWrap} ${styles.statIconGreen}`}><MessageSquare size={20} /></div>
          <div><div className={styles.statValue}>{customers.filter(c => c.inquiries!.length > 0).length}</div><div className={styles.statLabel}>With Inquiries</div></div>
        </div>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableTopbar}>
          <span className={styles.tableTitle}>All Customers</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Total Spent</th>
              <th>Inquiries</th>
              <th>Last Seen</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? customers.map(c => (
              <tr key={c.email}>
                <td style={{ fontWeight: 600 }}>{c.name}</td>
                <td>
                  <a href={`mailto:${c.email}`} style={{ color: '#2563eb', textDecoration: 'none', fontSize: '0.875rem' }}>
                    {c.email}
                  </a>
                </td>
                <td style={{ color: '#64748b' }}>{c.phone || '—'}</td>
                <td>
                  {c.orders!.length > 0 ? (
                    <span className={styles.catBadge} style={{ background: '#eff6ff', color: '#2563eb', borderColor: '#bfdbfe' }}>
                      {c.orders!.length} order{c.orders!.length !== 1 ? 's' : ''}
                    </span>
                  ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                </td>
                <td style={{ fontWeight: 600, color: c.totalSpend > 0 ? '#0f172a' : '#cbd5e1' }}>
                  {c.totalSpend > 0 ? `$${c.totalSpend.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : '—'}
                </td>
                <td>
                  {c.inquiries!.length > 0 ? (
                    <span className={styles.catBadge} style={{ background: '#f0fdf4', color: '#16a34a', borderColor: '#bbf7d0' }}>
                      {c.inquiries!.length}
                    </span>
                  ) : <span style={{ color: '#cbd5e1' }}>—</span>}
                </td>
                <td style={{ color: '#94a3b8', fontSize: '0.8125rem' }}>
                  {new Date(c.lastSeen).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
              </tr>
            )) : (
              <tr className={styles.emptyRow}><td colSpan={7}>No customers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
