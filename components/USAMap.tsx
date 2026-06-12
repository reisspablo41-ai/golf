'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import styles from './USAMap.module.css';

/*
  Standard US tile-grid layout (Pitch Interactive / NPR convention)
  Each state: { abbr, col, row }  — 0-indexed, 12 cols × 9 rows
*/
const STATES = [
  // ── row 0 ──────────────────────────────────────────────────────
  { abbr: 'ME', col: 11, row: 0 },
  // ── row 1 ──────────────────────────────────────────────────────
  { abbr: 'WA', col: 0,  row: 1 },
  { abbr: 'MT', col: 2,  row: 1 },
  { abbr: 'ND', col: 3,  row: 1 },
  { abbr: 'MN', col: 4,  row: 1 },
  { abbr: 'WI', col: 6,  row: 1 },
  { abbr: 'MI', col: 8,  row: 1 },
  { abbr: 'VT', col: 10, row: 1 },
  { abbr: 'NH', col: 11, row: 1 },
  // ── row 2 ──────────────────────────────────────────────────────
  { abbr: 'OR', col: 0,  row: 2 },
  { abbr: 'ID', col: 1,  row: 2 },
  { abbr: 'WY', col: 2,  row: 2 },
  { abbr: 'SD', col: 3,  row: 2 },
  { abbr: 'IA', col: 4,  row: 2 },
  { abbr: 'IL', col: 5,  row: 2 },
  { abbr: 'IN', col: 6,  row: 2 },
  { abbr: 'OH', col: 7,  row: 2 },
  { abbr: 'PA', col: 8,  row: 2 },
  { abbr: 'NY', col: 9,  row: 2 },
  { abbr: 'MA', col: 10, row: 2 },
  { abbr: 'RI', col: 11, row: 2 },
  // ── row 3 ──────────────────────────────────────────────────────
  { abbr: 'CA', col: 0,  row: 3 },
  { abbr: 'NV', col: 1,  row: 3 },
  { abbr: 'UT', col: 2,  row: 3 },
  { abbr: 'CO', col: 3,  row: 3 },
  { abbr: 'NE', col: 4,  row: 3 },
  { abbr: 'MO', col: 5,  row: 3 },
  { abbr: 'KY', col: 6,  row: 3 },
  { abbr: 'WV', col: 7,  row: 3 },
  { abbr: 'VA', col: 8,  row: 3 },
  { abbr: 'MD', col: 9,  row: 3 },
  { abbr: 'NJ', col: 10, row: 3 },
  { abbr: 'CT', col: 11, row: 3 },
  // ── row 4 ──────────────────────────────────────────────────────
  { abbr: 'AZ', col: 1,  row: 4 },
  { abbr: 'NM', col: 2,  row: 4 },
  { abbr: 'KS', col: 3,  row: 4 },
  { abbr: 'AR', col: 4,  row: 4 },
  { abbr: 'TN', col: 5,  row: 4 },
  { abbr: 'NC', col: 6,  row: 4 },
  { abbr: 'SC', col: 7,  row: 4 },
  { abbr: 'DE', col: 8,  row: 4 },
  // ── row 5 ──────────────────────────────────────────────────────
  { abbr: 'OK', col: 3,  row: 5 },
  { abbr: 'LA', col: 4,  row: 5 },
  { abbr: 'MS', col: 5,  row: 5 },
  { abbr: 'AL', col: 6,  row: 5 },
  { abbr: 'GA', col: 7,  row: 5 },
  // ── row 6 ──────────────────────────────────────────────────────
  { abbr: 'TX', col: 3,  row: 6 },
  { abbr: 'FL', col: 6,  row: 6 },
  // ── row 7 – insets ─────────────────────────────────────────────
  { abbr: 'AK', col: 0,  row: 7 },
  { abbr: 'HI', col: 2,  row: 7 },
];

export default function USAMap() {
  return (
    <section className={styles.section}>
      <div className="container">

        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.eyebrow}>Coverage</span>
          <h2 className={styles.title}>We Deliver to All 50 States</h2>
          <p className={styles.sub}>
            From California to Maine, Florida to Alaska — Premier Carts ships nationwide with fully insured, tracked freight delivery straight to your door.
          </p>
        </motion.div>

        <div className={styles.mapWrap}>
          <div className={styles.grid}>
            {STATES.map(({ abbr, col, row }, i) => (
              <motion.div
                key={abbr}
                className={styles.tile}
                style={{ gridColumn: col + 1, gridRow: row + 1 }}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.35, delay: i * 0.018, ease: 'easeOut' }}
                whileHover={{ scale: 1.15, zIndex: 10 }}
              >
                <span className={styles.tileLabel}>{abbr}</span>
                <div className={styles.tilePulse} />
              </motion.div>
            ))}
          </div>

          {/* Decorative connecting lines */}
          <div className={styles.glow} />
        </div>

        <motion.div
          className={styles.cta}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className={styles.badges}>
            {['Fully Insured Freight', 'Real-Time Tracking', 'White-Glove Delivery', 'No Destination Surcharges'].map(b => (
              <span key={b} className={styles.badge}>{b}</span>
            ))}
          </div>
          <Link href="/shop" className={styles.ctaBtn}>
            Browse Inventory <ArrowRight size={16} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
