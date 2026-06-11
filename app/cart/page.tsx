'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/CartContext';
import styles from './page.module.css';

export default function CartPage() {
  const { items, removeItem, updateQty, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.emptyCart}>
        <ShoppingBag size={64} className={styles.emptyIcon} />
        <h2>Your cart is empty</h2>
        <p>Browse our inventory to find your perfect golf cart.</p>
        <Link href="/shop" className="btn btn-primary">Browse Inventory</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      <div className={styles.pageHeader}>
        <h1>Your Cart</h1>
        <button onClick={clearCart} className={styles.clearBtn}>Clear cart</button>
      </div>

      <div className={styles.cartLayout}>
        {/* Items */}
        <div className={styles.itemsList}>
          {items.map(item => (
            <div key={item.id} className={styles.cartItem}>
              <div
                className={styles.itemImage}
                style={{ backgroundImage: `url(${item.image || 'https://images.unsplash.com/photo-1593111774640-36e6557551cc?auto=format&fit=crop&w=400&q=80'})` }}
              />
              <div className={styles.itemDetails}>
                <h3>{item.name}</h3>
                <p className={styles.itemPrice}>${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              </div>
              <div className={styles.qtyControl}>
                <button onClick={() => updateQty(item.id, item.quantity - 1)} aria-label="Decrease"><Minus size={14} /></button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQty(item.id, item.quantity + 1)} aria-label="Increase"><Plus size={14} /></button>
              </div>
              <p className={styles.lineTotal}>${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
              <button onClick={() => removeItem(item.id)} className={styles.removeBtn} aria-label="Remove item">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className={styles.summary}>
          <h3>Order Summary</h3>
          <div className={styles.summaryRows}>
            {items.map(item => (
              <div key={item.id} className={styles.summaryRow}>
                <span>{item.name} × {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
              </div>
            ))}
          </div>
          <div className={styles.summaryTotal}>
            <span>Total</span>
            <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>
          <Link href="/checkout" className={`btn btn-primary ${styles.checkoutBtn}`}>
            Proceed to Checkout <ArrowRight size={16} />
          </Link>
          <Link href="/shop" className={styles.continueLink}>← Continue Shopping</Link>
        </aside>
      </div>
    </div>
  );
}
