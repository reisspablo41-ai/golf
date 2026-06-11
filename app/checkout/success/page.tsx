import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import styles from './page.module.css';

const PAYMENT_LABELS: Record<string, string> = {
  cashapp:  'Cash App',
  applepay: 'Apple Pay',
  venmo:    'Venmo',
  chime:    'Chime',
  bank:     'Bank Transfer',
  crypto:   'Crypto',
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ orderId?: string; method?: string }>;
}) {
  const { orderId, method } = await searchParams;

  let order: { total_amount: number; customer_email: string; shipping_address: Record<string, string> } | null = null;
  if (orderId) {
    const supabase = await createClient();
    const { data } = await supabase
      .from('orders')
      .select('total_amount, customer_email, shipping_address')
      .eq('id', orderId)
      .single();
    order = data;
  }

  const paymentLabel = method ? (PAYMENT_LABELS[method] ?? method) : null;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.iconWrap}>
          <CheckCircle size={56} className={styles.icon} />
        </div>

        <h1>Order Confirmed!</h1>

        <p className={styles.subtitle}>
          Thank you, <strong>{order?.shipping_address?.name || 'valued customer'}</strong>!
          A confirmation has been sent to <strong>{order?.customer_email || 'your email'}</strong>.
        </p>

        {orderId && (
          <div className={styles.orderIdBox}>
            <span className={styles.orderIdLabel}>Order ID</span>
            <span className={styles.orderIdValue}>{orderId}</span>
          </div>
        )}

        {order && (
          <div className={styles.totalBox}>
            <span>Order Total</span>
            <span>${Number(order.total_amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        )}

        {paymentLabel && (
          <div className={styles.paymentNote}>
            <p>
              You selected <strong>{paymentLabel}</strong> as your payment method.
              Our team will contact you shortly with payment details to complete your order.
            </p>
          </div>
        )}

        <div className={styles.actions}>
          <Link href="/shop" className="btn btn-primary">Continue Shopping</Link>
          <Link href="/contact" className={styles.contactLink}>Need help? Contact us</Link>
        </div>
      </div>
    </div>
  );
}
