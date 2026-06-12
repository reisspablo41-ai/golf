'use client';

import { useState, useTransition } from 'react';
import styles from '../app/admin/admin.module.css';

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

export default function AdminOrderStatusSelect({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: string;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [pending, startTransition] = useTransition();

  function handleChange(next: string) {
    startTransition(async () => {
      setStatus(next);
      await fetch('/api/admin/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: orderId, status: next }),
      });
    });
  }

  return (
    <select
      value={status}
      onChange={e => handleChange(e.target.value)}
      disabled={pending}
      style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: STATUS_COLORS[status] || '#374151',
        background: STATUS_BG[status] || '#f9fafb',
        border: `1px solid ${STATUS_COLORS[status] || '#d1d5db'}`,
        borderRadius: '2rem',
        padding: '0.25rem 0.625rem',
        cursor: 'pointer',
        outline: 'none',
        opacity: pending ? 0.6 : 1,
        textTransform: 'capitalize',
      }}
    >
      {['pending', 'processing', 'shipped', 'delivered', 'cancelled'].map(s => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
