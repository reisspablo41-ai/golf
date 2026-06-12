import Link from 'next/link';
import Image from 'next/image';
import { Trophy, Wrench, ShieldCheck, Users, ArrowRight } from 'lucide-react';
import styles from './about.module.css';

export const metadata = {
  title: 'About Us | Premier Golf Carts',
  description: 'Learn the story behind Premier Golf Carts — master craftsmen, precision engineering, and nationwide delivery from our Florida facility.',
};

export default function AboutPage() {
  return (
    <main>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroImg} />
        <div className={styles.heroOverlay} />
        <div className={styles.heroContent}>
          <div className="container">
            <span className={styles.eyebrow}>Our Story</span>
            <h1 className={styles.heroTitle}>Built on Passion.<br />Driven by Craft.</h1>
            <p className={styles.heroSub}>
              From a Florida garage to a nationwide operation — Premier Golf Carts was born from a relentless pursuit of the perfect ride.
            </p>
          </div>
        </div>
      </section>

      {/* ── STORY ── */}
      <section className={styles.story}>
        <div className="container">
          <div className={styles.storyInner}>

            <div className={styles.storyImgWrap}>
              <Image
                src="https://images.pexels.com/photos/12586166/pexels-photo-12586166.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Customers enjoying a Premier Golf Cart"
                width={1200}
                height={900}
                className={styles.storyImg}
                priority
              />
            </div>

            <div className={styles.storyText}>
              <span className={styles.eyebrow}>Who We Are</span>
              <h2 className={styles.storyTitle}>More Than a Cart Dealer — We're Builders.</h2>
              <p className={styles.storyBody}>
                Premier Carts was founded on a singular, uncompromising vision: to elevate the standard of low-speed vehicles and custom golf carts beyond simple utility and into the realm of luxury, performance, and highly personalized engineering. What began as a passionate pursuit to build the ultimate neighborhood cruiser has grown into a premier, nationwide operation.
              </p>
              <p className={styles.storyBody}>
                We recognized early on that golf carts were no longer confined just to the fairway — they've rapidly evolved into primary modes of transportation for master-planned communities, ranches, industrial complexes, and street-legal city commuting. By bridging the gap between automotive-grade engineering and bespoke hand-crafted design, we've revolutionized what a golf cart can be.
              </p>
              <p className={styles.storyBody}>
                Today, Premier Carts operates out of a state-of-the-art facility in Florida, where raw chassis and advanced lithium-ion power plants are meticulously transformed into custom-built masterpieces by a team of master mechanics, specialized electricians, and dedicated designers.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className={styles.statsBar}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: '500+', label: 'Carts Delivered' },
              { value: '50',   label: 'States Served' },
              { value: '10+',  label: 'Years Experience' },
              { value: '100%', label: 'Satisfaction Rate' },
            ].map(s => (
              <div key={s.label}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BUILD PROCESS ── */}
      <section className={styles.process}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>How We Build</span>
            <h2 className={styles.sectionTitle}>The Build Process</h2>
            <p className={styles.sectionSub}>Every cart undergoes a rigorous 32-point inspection before it ever leaves our facility.</p>
          </div>
          <div className={styles.processGrid}>
            {[
              { n: '01', title: 'Chassis Prep',       desc: 'We start with premium-grade frames — inspected, cleaned, and treated for corrosion resistance before any build begins.' },
              { n: '02', title: 'Power & Electrical', desc: 'Advanced lithium-ion power plants and full wiring harnesses are installed to automotive standards with proper gauging and fusing.' },
              { n: '03', title: 'Body & Finishing',   desc: 'Marine-grade upholstery, custom paint or wrap, and premium trim are applied by hand. Every panel is fitted, not forced.' },
              { n: '04', title: '32-Point Inspection', desc: 'Torque validation, alignment mapping, electrical diagnostics, and a final road test. Only then does it earn the Premier Carts seal.' },
            ].map(step => (
              <div key={step.n} className={styles.processCard}>
                <div className={styles.processNum}>{step.n}</div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE PILLARS ── */}
      <section className={styles.pillars}>
        <div className="container">
          <div className={styles.sectionHead}>
            <span className={styles.eyebrow}>Our Values</span>
            <h2 className={styles.sectionTitle}>Core Pillars</h2>
          </div>
          <div className={styles.pillarsGrid}>
            {[
              { icon: <Trophy size={36} />,     title: 'Quality Craftsmanship', desc: 'Built to outlast and outperform the competition with premium sourced materials and meticulous attention to detail.' },
              { icon: <Wrench size={36} />,      title: 'Precision Engineering',  desc: 'Advanced suspension systems, reliable powertrains, and cutting-edge lithium technology on every build.' },
              { icon: <ShieldCheck size={36} />, title: 'Safety First',           desc: 'Street-legal configurations exceeding local DOT requirements with full light kits, mirrors, and seatbelts.' },
              { icon: <Users size={36} />,       title: 'Customer Dedication',    desc: 'Unwavering support long after your cart is delivered, backed by our industry-leading warranty.' },
            ].map(p => (
              <div key={p.title} className={styles.pillarCard}>
                <div className={styles.pillarIcon}>{p.icon}</div>
                <h3 className={styles.pillarTitle}>{p.title}</h3>
                <p className={styles.pillarDesc}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM CTA ── */}
      <section className={styles.team}>
        <div className="container">
          <h2 className={styles.teamTitle}>Meet the Team Behind Every Build</h2>
          <p className={styles.teamSub}>
            Our crew of master mechanics, specialized electricians, and dedicated customer success reps are all united by one goal: building the best carts on the market.
          </p>
          <Link href="/contact" className={styles.teamBtn}>
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

    </main>
  );
}
