'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, DollarSign, Smartphone, CreditCard, Building2, Landmark, Bitcoin } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import styles from './page.module.css';

const PAYMENT_METHODS = [
  { id: 'cashapp',  label: 'Cash App',      icon: <DollarSign size={22} /> },
  { id: 'applepay', label: 'Apple Pay',     icon: <Smartphone size={22} /> },
  { id: 'venmo',    label: 'Venmo',         icon: <CreditCard size={22} /> },
  { id: 'chime',    label: 'Chime',         icon: <Building2  size={22} /> },
  { id: 'bank',     label: 'Bank Transfer', icon: <Landmark   size={22} /> },
  { id: 'crypto',   label: 'Crypto',        icon: <Bitcoin    size={22} /> },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, total, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    street: '', city: '', state: '', zip: '', country: 'US',
  });

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [field]: e.target.value }));

  const isValid = form.name && form.email && form.street && form.city && form.state && form.zip && paymentMethod;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);

    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer: form,
        items,
        total,
        paymentMethod,
      }),
    });

    if (res.ok) {
      const { orderId } = await res.json();
      clearCart();
      router.push(`/checkout/success?orderId=${orderId}&method=${paymentMethod}`);
    } else {
      alert('Something went wrong. Please try again.');
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <Link href="/shop" className="btn btn-primary">Browse Inventory</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      <Link href="/cart" className={styles.backLink}><ArrowLeft size={16} /> Back to Cart</Link>
      <h1 className={styles.pageTitle}>Checkout</h1>

      <form onSubmit={handleSubmit} className={styles.checkoutLayout}>
        {/* Left column — form */}
        <div className={styles.formColumn}>

          {/* Contact */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Contact Information</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Full Name *</label>
                <input type="text" value={form.name} onChange={set('name')} required placeholder="John Smith" />
              </div>
              <div className={styles.inputGroup}>
                <label>Email Address *</label>
                <input type="email" value={form.email} onChange={set('email')} required placeholder="john@example.com" />
              </div>
              <div className={styles.inputGroup}>
                <label>Phone Number *</label>
                <input type="tel" value={form.phone} onChange={set('phone')} required placeholder="(555) 000-0000" />
              </div>
            </div>
          </section>

          {/* Shipping */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Shipping Address</h2>
            <div className={styles.formGrid}>
              <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                <label>Street Address *</label>
                <input type="text" value={form.street} onChange={set('street')} required placeholder="123 Main Street" />
              </div>
              <div className={styles.inputGroup}>
                <label>City *</label>
                <input type="text" value={form.city} onChange={set('city')} required placeholder="Atlanta" />
              </div>
              <div className={styles.inputGroup}>
                <label>State *</label>
                <input type="text" value={form.state} onChange={set('state')} required placeholder="GA" maxLength={2} />
              </div>
              <div className={styles.inputGroup}>
                <label>ZIP Code *</label>
                <input type="text" value={form.zip} onChange={set('zip')} required placeholder="30301" />
              </div>
              <div className={styles.inputGroup}>
                <label>Country</label>
                <select value={form.country} onChange={set('country')}>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                </select>
              </div>
            </div>
          </section>

          {/* Payment method */}
          <section className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Payment Method</h2>
            <p className={styles.paymentNote}>Select your preferred method. Our team will reach out with payment details after your order is placed.</p>
            <div className={styles.paymentGrid}>
              {PAYMENT_METHODS.map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`${styles.paymentCard} ${paymentMethod === m.id ? styles.selected : ''}`}
                >
                  <span className={styles.paymentIcon}>{m.icon}</span>
                  <span className={styles.paymentLabel}>{m.label}</span>
                </button>
              ))}
            </div>
          </section>

          <button
            type="submit"
            className={`btn btn-primary ${styles.submitBtn}`}
            disabled={!isValid || submitting}
          >
            {submitting ? 'Placing Order…' : `Place Order · $${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
          </button>

          <div className={styles.trustRow}>
            <ShieldCheck size={18} />
            <span>Your information is secure and will never be shared.</span>
          </div>
        </div>

        {/* Right column — order summary */}
        <aside className={styles.orderSummary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryItems}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryItem}>
                <div
                  className={styles.summaryImage}
                  style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1593111774640-36e6557551cc?auto=format&fit=crop&w=200&q=80'})` }}
                />
                <div className={styles.summaryItemInfo}>
                  <p className={styles.summaryItemName}>{item.name}</p>
                  <p className={styles.summaryItemQty}>Qty: {item.quantity}</p>
                </div>
                <p className={styles.summaryItemPrice}>${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
            ))}
          </div>
          <div className={styles.summaryDivider} />
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
        </aside>
      </form>
    </div>
  );
}
