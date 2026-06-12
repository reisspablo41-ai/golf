'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './PromoCarousel.module.css';

const slides = [
  {
    image: 'https://images.pexels.com/photos/37721060/pexels-photo-37721060.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'Premium Inventory',
    headline: 'Your Perfect Ride Is Waiting.',
    sub: 'Hundreds of electric, gas, and street-legal carts in stock — hand-inspected and ready to ship to your driveway nationwide.',
    primary:   { label: 'View Inventory', href: '/shop' },
    secondary: { label: 'Design Your Own', href: '/custom-build' },
  },
  {
    image: 'https://images.pexels.com/photos/9366549/pexels-photo-9366549.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'Built for Every Lifestyle',
    headline: 'Engineered Around You.',
    sub: 'From golf course cruisers to lifted off-road beasts, every cart we build is tailored to how you live and where you ride.',
    primary:   { label: 'Buy Now', href: '/shop' },
    secondary: { label: 'Custom Builds', href: '/custom-build' },
  },
  {
    image: 'https://images.pexels.com/photos/6360039/pexels-photo-6360039.jpeg?auto=compress&cs=tinysrgb&w=1920',
    eyebrow: 'Ready to Ship Today',
    headline: 'Don\'t Wait — Drive Now.',
    sub: 'No months-long lead times. Our ready-to-ship inventory means you could be behind the wheel within days, not months.',
    primary:   { label: 'Buy Now', href: '/shop' },
    secondary: { label: 'View Inventory', href: '/shop' },
  },
];

const variants: Variants = {
  enter: (dir: number) => ({ opacity: 0, scale: dir > 0 ? 1.04 : 0.97 }),
  center: { opacity: 1, scale: 1, transition: { duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:  (dir: number) => ({ opacity: 0, scale: dir > 0 ? 0.97 : 1.04, transition: { duration: 0.6 } }),
};

const textVariants: Variants = {
  initial: { opacity: 0, y: 28 },
  animate: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.12, ease: 'easeOut' } }),
};

export default function PromoCarousel() {
  const [[index, direction], setPage] = useState([0, 0]);
  const paused = useRef(false);

  const paginate = useCallback((dir: number) => {
    setPage(([i]) => [(i + dir + slides.length) % slides.length, dir]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) paginate(1);
    }, 6000);
    return () => clearInterval(id);
  }, [paginate]);

  const slide = slides[index];

  return (
    <section
      className={styles.section}
      onMouseEnter={() => { paused.current = true; }}
      onMouseLeave={() => { paused.current = false; }}
    >
      {/* Background image with ken-burns */}
      <div className={styles.imageWrap}>
        <AnimatePresence mode="sync" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className={styles.imageBg}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        </AnimatePresence>
        <div className={styles.overlay} />
      </div>

      {/* Content */}
      <div className={`container ${styles.content}`}>
        <AnimatePresence mode="wait">
          <motion.div key={index} className={styles.inner}>
            <motion.span
              custom={0} variants={textVariants} initial="initial" animate="animate"
              className={styles.eyebrow}
            >
              {slide.eyebrow}
            </motion.span>
            <motion.h2
              custom={1} variants={textVariants} initial="initial" animate="animate"
              className={styles.headline}
            >
              {slide.headline}
            </motion.h2>
            <motion.p
              custom={2} variants={textVariants} initial="initial" animate="animate"
              className={styles.sub}
            >
              {slide.sub}
            </motion.p>
            <motion.div
              custom={3} variants={textVariants} initial="initial" animate="animate"
              className={styles.actions}
            >
              <Link href={slide.primary.href} className={styles.btnPrimary}>
                {slide.primary.label} <ArrowRight size={16} />
              </Link>
              <Link href={slide.secondary.href} className={styles.btnOutline}>
                {slide.secondary.label}
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => paginate(-1)} aria-label="Previous slide">
        <ChevronLeft size={22} />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => paginate(1)} aria-label="Next slide">
        <ChevronRight size={22} />
      </button>

      {/* Dots */}
      <div className={styles.dots}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
            onClick={() => setPage([i, i > index ? 1 : -1])}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className={styles.progressBar}>
        <motion.div
          key={index}
          className={styles.progressFill}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 6, ease: 'linear' }}
        />
      </div>
    </section>
  );
}
