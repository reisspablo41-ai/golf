'use client';

import Link from 'next/link';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import styles from './HeroSection.module.css';

const stagger: Variants = {
  animate: { transition: { staggerChildren: 0.15 } },
};
const item: Variants = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.video}
      >
        <source src="https://www.pexels.com/download/video/9207982/" type="video/mp4" />
      </video>
      <div className={styles.bg} />
      <div className={`container ${styles.content}`}>
        <motion.div variants={stagger} initial="initial" animate="animate" className={styles.inner}>
          <motion.h1 variants={item} className={styles.headline}>
            Drive in <span className={styles.gold}>Style.</span>
            <br />Built to <span className={styles.gold}>Dominate.</span>
          </motion.h1>
          <motion.p variants={item} className={styles.sub}>
            Custom electric, gas, and street-legal golf carts engineered for maximum performance. From factory floor to your driveway — anywhere in the country.
          </motion.p>
          <motion.div variants={item} className={styles.actions}>
            <Link href="/shop" className={`btn btn-primary ${styles.btnPrimary}`}>
              Browse Inventory
            </Link>
            <Link href="/custom-build" className={`btn ${styles.btnOutline}`}>
              Design Your Cart <ArrowRight size={16} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <a href="#stats" className={styles.scrollDown} aria-label="Scroll down">
        <ChevronDown size={28} />
      </a>
    </section>
  );
}
