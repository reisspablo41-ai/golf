import Link from 'next/link';
import { ArrowRight, Truck, ShieldCheck, CreditCard, Wrench, Star, MapPin, Zap, Fuel, Settings } from 'lucide-react';
import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import FadeIn from '@/components/FadeIn';
import HeroSection from '@/components/HeroSection';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import AnimatedCounter from '@/components/AnimatedCounter';
import PromoCarousel from '@/components/PromoCarousel';
import USAMap from '@/components/USAMap';
import { getDiscount, applyDiscount } from '@/utils/discount';

export default async function Home() {
  const supabase = await createClient();
  const [{ data: featuredProducts }, discount] = await Promise.all([
    supabase.from('products').select('*').order('created_at', { ascending: false }).limit(3),
    getDiscount(),
  ]);

  const displayProducts = featuredProducts?.length ? featuredProducts : [];
  const hasDiscount = discount.active && discount.percent > 0;
  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className={styles.home}>

      {/* ── 1. HERO ── */}
      <HeroSection />

      {/* ── 2. STATS ── */}
      <section id="stats" className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {[
              { value: 500, suffix: '+', label: 'Carts Delivered', icon: <Truck size={28} /> },
              { value: 48,  suffix: '',  label: 'States Served',   icon: <MapPin size={28} /> },
              { value: 10,  suffix: '+', label: 'Years Experience', icon: <Star size={28} /> },
              { value: 100, suffix: '%', label: 'Satisfaction Rate', icon: <ShieldCheck size={28} /> },
            ].map((s, i) => (
              <FadeIn key={s.label} delay={i * 0.1}>
                <div className={styles.statCard}>
                  <div className={styles.statIcon}>{s.icon}</div>
                  <div className={styles.statValue}>
                    <AnimatedCounter to={s.value} suffix={s.suffix} />
                  </div>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. PROMO CAROUSEL ── */}
      <PromoCarousel />

      {/* ── 4. CATEGORIES ── */}
      <section className={styles.categories}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Browse by Type</span>
              <h2 className={styles.sectionTitle}>Shop by Category</h2>
              <p className={styles.sectionSub}>From street-legal LSVs to lifted off-road beasts — we build it all.</p>
            </div>
          </FadeIn>
          <div className={styles.categoryGrid}>
            {[
              { href: '/shop?category=electric', label: 'Electric LSVs',       sub: 'Silent. Fast. Street-Legal.',    bg: 'url(/images/electric_cart.png)', icon: <Zap size={32} /> },
              { href: '/shop?category=gas',      label: 'Gas Powered',         sub: 'Raw power. All terrain.',        bg: 'url(/images/gas_cart.png)', icon: <Fuel size={32} /> },
              { href: '/shop?category=custom',   label: 'Custom Builds',       sub: 'Spec it. Build it. Own it.',     bg: 'url(/images/custom_cart.png)', icon: <Wrench size={32} /> },
              { href: '/shop?category=parts',    label: 'Parts & Accessories', sub: 'OEM quality. Expert sourced.',   bg: 'url(/images/cart_parts.png)', icon: <Settings size={32} /> },
            ].map((cat, i) => (
              <FadeIn key={cat.href} delay={i * 0.1}>
                <Link href={cat.href} className={styles.categoryCard}>
                  <div className={styles.categoryBg} style={{ backgroundImage: cat.bg }} />
                  <div className={styles.categoryContent}>
                    <span className={styles.categoryIcon}>{cat.icon}</span>
                    <h3 className={styles.categoryLabel}>{cat.label}</h3>
                    <p className={styles.categorySub}>{cat.sub}</p>
                    <span className={styles.categoryArrow}>Shop Now <ArrowRight size={14} /></span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. HOW IT WORKS ── */}
      <section className={styles.howItWorks}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Simple Process</span>
              <h2 className={styles.sectionTitle}>How It Works</h2>
              <p className={styles.sectionSub}>Getting your perfect cart is easier than you think.</p>
            </div>
          </FadeIn>
          <div className={styles.stepsGrid}>
            {[
              { n: '01', title: 'Browse or Configure', desc: 'Shop our ready-to-ship inventory or use our custom builder to spec your dream cart from the ground up.' },
              { n: '02', title: 'Place Your Order',    desc: 'Submit your order with your preferred payment method. We confirm within hours and immediately begin production or fulfillment.' },
              { n: '03', title: 'Delivered to You',    desc: 'White-glove freight delivery straight to your driveway anywhere in the country, fully insured and tracked.' },
            ].map((step, i) => (
              <FadeIn key={step.n} delay={i * 0.15}>
                <div className={styles.stepCard}>
                  <span className={styles.stepNumber}>{step.n}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FEATURED INVENTORY ── */}
      <section className={styles.featured}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHeadRow}>
              <div>
                <span className={styles.eyebrow}>Ready to Ship</span>
                <h2 className={styles.sectionTitle}>Featured Inventory</h2>
              </div>
              <Link href="/shop" className={styles.viewAll}>View All <ArrowRight size={16} /></Link>
            </div>
          </FadeIn>
          <div className={styles.featuredGrid}>
            {displayProducts.map((cart, i) => {
              const original = Number(cart.base_price);
              const sale = applyDiscount(original, discount);
              return (
                <FadeIn key={cart.id} delay={i * 0.1}>
                  <div className={styles.featuredCard}>
                    <div
                      className={styles.featuredImg}
                      style={{ backgroundImage: `url(${cart.images?.[0] || 'https://images.unsplash.com/photo-1593111774640-36e6557551cc?auto=format&fit=crop&w=800&q=80'})` }}
                    >
                      <span className={styles.featuredBadge}>{cart.category}</span>
                      {hasDiscount && (
                        <span style={{ position: 'absolute', top: '1rem', right: '1rem', background: '#dc2626', color: 'white', fontSize: '0.6875rem', fontWeight: 700, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                          {discount.percent}% OFF
                        </span>
                      )}
                    </div>
                    <div className={styles.featuredBody}>
                      <h3 className={styles.featuredName}>{cart.name}</h3>
                      {hasDiscount ? (
                        <p className={styles.featuredPrice}>
                          <span style={{ textDecoration: 'line-through', color: '#94a3b8', fontSize: '0.9375rem', fontWeight: 500, marginRight: '0.375rem' }}>${fmt(original)}</span>
                          <span style={{ color: '#dc2626' }}>${fmt(sale)}</span>
                        </p>
                      ) : (
                        <p className={styles.featuredPrice}>${fmt(original)}</p>
                      )}
                      <Link href={`/shop/${cart.slug}`} className={styles.featuredBtn}>
                        View Details <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
            {displayProducts.length === 0 && (
              <p className={styles.emptyMsg}>No featured products yet — check back soon.</p>
            )}
          </div>
        </div>
      </section>

      {/* ── 6. WHY CHOOSE US ── */}
      <section className={styles.whyUs}>
        <div className="container">
          <FadeIn>
            <div className={styles.sectionHead}>
              <span className={styles.eyebrow}>Our Difference</span>
              <h2 className={styles.sectionTitle}>Why Premier Carts?</h2>
            </div>
          </FadeIn>
          <div className={styles.whyGrid}>
            {[
              {
                icon: <Wrench size={32} />,
                title: 'Master Craftsmen',
                desc: 'Every build passes a rigorous 32-point inspection covering electrical diagnostics, torque validation, and full alignment mapping before it ever ships.',
              },
              {
                icon: <ShieldCheck size={32} />,
                title: 'Backed by Warranty',
                desc: "Industry-leading coverage on every vehicle we sell. If something's wrong, we make it right — no runaround, no fine print.",
              },
              {
                icon: <Truck size={32} />,
                title: 'Nationwide Delivery',
                desc: 'Fully insured, tracked freight delivery to your driveway in all 48 continental states. White-glove handling from our floor to yours.',
              },
              {
                icon: <CreditCard size={32} />,
                title: 'Flexible Financing',
                desc: 'Multiple payment options including Cash App, Venmo, bank transfer, and crypto. Financing plans available — get approved in minutes.',
              },
            ].map((item, i) => (
              <FadeIn key={item.title} delay={i * 0.1}>
                <div className={styles.whyCard}>
                  <div className={styles.whyIcon}>{item.icon}</div>
                  <h3 className={styles.whyTitle}>{item.title}</h3>
                  <p className={styles.whyDesc}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. USA MAP ── */}
      <USAMap />

      {/* ── 8. BUILD BANNER ── */}
      <section className={styles.buildBanner}>
        <div className="container">
          <FadeIn>
            <div className={styles.buildBannerInner}>
              <div>
                <h2 className={styles.buildBannerTitle}>Have a vision? Let's build it.</h2>
                <p className={styles.buildBannerSub}>Use our custom cart configurator to spec your exact build — body, motor, color, accessories, and more.</p>
              </div>
              <Link href="/custom-build" className={`btn ${styles.buildBannerBtn}`}>
                Start Designing <ArrowRight size={16} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── 8. TESTIMONIALS SLIDER ── */}
      <TestimonialsSlider />

      {/* ── 9. TRUST BADGES ── */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            {[
              { icon: <ShieldCheck size={24} />, text: '2-Year Warranty on All Vehicles' },
              { icon: <Truck size={24} />,       text: 'Free Delivery on Orders Over $5,000' },
              { icon: <Star size={24} />,         text: '4.9 / 5 Average Rating Across 200+ Reviews' },
              { icon: <CreditCard size={24} />,  text: '0% APR Financing Available' },
            ].map((b) => (
              <div key={b.text} className={styles.trustBadge}>
                <span className={styles.trustIcon}>{b.icon}</span>
                <span>{b.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FINAL CTA ── */}
      <section className={styles.cta}>
        <div className={styles.ctaOverlay} />
        <div className={`container ${styles.ctaContent}`}>
          <FadeIn>
            <span className={styles.eyebrowLight}>Ready?</span>
            <h2 className={styles.ctaTitle}>Your Dream Cart Is One Click Away.</h2>
            <p className={styles.ctaSub}>Browse our ready-to-ship inventory or work with our builders to create something truly one-of-a-kind.</p>
            <div className={styles.ctaBtns}>
              <Link href="/shop" className={`btn ${styles.ctaBtnPrimary}`}>View Inventory</Link>
              <Link href="/contact" className={`btn ${styles.ctaBtnOutline}`}>Talk to a Builder</Link>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
