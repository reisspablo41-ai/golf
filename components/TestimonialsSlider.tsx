'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './TestimonialsSlider.module.css';

const testimonials = [
  {
    quote: "The attention to detail on my custom Phantom build is absolutely insane. It's the talk of the neighborhood every single time I take it out. Premier handled the shipping perfectly — arrived without a scratch.",
    author: "Michael T.",
    location: "Tampa, Florida",
    vehicle: "Custom Phantom Build",
    rating: 5,
  },
  {
    quote: "We ordered 4 electric carts for our ranch. The lithium battery upgrade was worth every single penny. Phenomenal torque and the battery lasts all day across rough terrain.",
    author: "Sarah J.",
    location: "Austin, Texas",
    vehicle: "Electric LSV × 4",
    rating: 5,
  },
  {
    quote: "I needed specific OEM parts for a complete rebuild on a '19 Club Car. Their team sourced everything within 3 days. Communication was great start to finish. Won't go anywhere else.",
    author: "David R.",
    location: "Savannah, Georgia",
    vehicle: "OEM Parts Order",
    rating: 5,
  },
  {
    quote: "The 4\" lift kit paired with the custom blacked-out alloy wheels is jaw-dropping. Takes it off-road with ease. My second cart from Premier and it won't be my last.",
    author: "James K.",
    location: "Scottsdale, Arizona",
    vehicle: "Off-Road Lifted Build",
    rating: 5,
  },
  {
    quote: "Fast shipping, perfect condition on arrival, and the cart runs like a dream. The whole process took less than two weeks from order to driveway. Genuinely impressed.",
    author: "Linda M.",
    location: "Nashville, Tennessee",
    vehicle: "Gas Powered Cart",
    rating: 5,
  },
  {
    quote: "Three carts purchased over five years and the quality only gets better. These guys are the real deal — premium builds, honest pricing, and they stand behind their work.",
    author: "Robert W.",
    location: "Charleston, South Carolina",
    vehicle: "Repeat Customer",
    rating: 5,
  },
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '60%' : '-60%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-60%' : '60%', opacity: 0 }),
};

export default function TestimonialsSlider() {
  const [[index, direction], setPage] = useState([0, 0]);
  const paused = useRef(false);

  const paginate = useCallback((dir: number) => {
    setPage(([i]) => [(i + dir + testimonials.length) % testimonials.length, dir]);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!paused.current) paginate(1);
    }, 5000);
    return () => clearInterval(id);
  }, [paginate]);

  const t = testimonials[index];

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className={styles.eyebrow}>Testimonials</span>
          <h2 className={styles.title}>What Our Riders Say</h2>
        </div>

        <div
          className={styles.sliderWrap}
          onMouseEnter={() => { paused.current = true; }}
          onMouseLeave={() => { paused.current = false; }}
        >
          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={() => paginate(-1)} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>

          <div className={styles.cardWrap}>
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={styles.card}
              >
                <div className={styles.stars}>
                  {'★'.repeat(t.rating)}
                </div>
                <blockquote className={styles.quote}>"{t.quote}"</blockquote>
                <div className={styles.meta}>
                  <div className={styles.avatar}>{t.author.charAt(0)}</div>
                  <div>
                    <p className={styles.author}>{t.author}</p>
                    <p className={styles.detail}>{t.location} · {t.vehicle}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={() => paginate(1)} aria-label="Next">
            <ChevronRight size={22} />
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ''}`}
              onClick={() => setPage([i, i > index ? 1 : -1])}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
