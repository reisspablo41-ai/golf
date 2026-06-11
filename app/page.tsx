import Link from 'next/link';
import { ArrowRight, ShieldCheck, Truck, CreditCard } from 'lucide-react';
import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import FadeIn from '@/components/FadeIn';

export default async function Home() {
  const supabase = await createClient();
  const { data: featuredProducts } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  const displayProducts = featuredProducts?.length ? featuredProducts : [];
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className={styles.heroVideo}
        >
          <source src="https://www.pexels.com/fr-fr/download/video/9208386/" type="video/mp4" />
        </video>
        <div className={styles.heroOverlay}></div>
        <div className={`container ${styles.heroContent}`}>
          <h1 className={`${styles.heroTitle} fade-in`}>
            Drive Your <span className={styles.heroHighlight}>Ambition</span>
          </h1>
          <p className={`${styles.heroSubtitle} fade-in`} style={{ animationDelay: '0.2s' }}>
            Premium custom and street-legal golf carts engineered for maximum performance and unparalleled style.
          </p>
          <div className={`${styles.heroActions} fade-in`} style={{ animationDelay: '0.4s' }}>
            <Link href="/shop" className="btn btn-primary">
              Browse Inventory
            </Link>
            <Link href="/custom-build" className={`btn btn-accent ${styles.customBtn}`}>
              Design Your Custom Cart <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className={styles.categories}>
        <div className="container">
          <h2 className={styles.sectionTitle}>Shop by Category</h2>
          <div className={styles.categoryGrid}>
            <Link href="/shop?category=electric" className={styles.categoryCard}>
              <div className={styles.categoryImagePlaceholder} style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }}>
                <span>Electric LSVs</span>
              </div>
            </Link>
            <Link href="/shop?category=gas" className={styles.categoryCard}>
              <div className={styles.categoryImagePlaceholder} style={{ background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
                <span>Gas Powered</span>
              </div>
            </Link>
            <Link href="/shop?category=custom" className={styles.categoryCard}>
              <div className={styles.categoryImagePlaceholder} style={{ background: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)', color: '#0b1120' }}>
                <span>Off-Road/Lifted</span>
              </div>
            </Link>
            <Link href="/shop?category=parts" className={styles.categoryCard}>
              <div className={styles.categoryImagePlaceholder} style={{ background: 'linear-gradient(135deg, #475569 0%, #64748b 100%)' }}>
                <span>OEM Parts</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Inventory Section */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Inventory</h2>
            <Link href="/shop" className={styles.viewAllLink}>View All <ArrowRight size={16} /></Link>
          </div>
          <div className={styles.featuredGrid}>
            {displayProducts.map((cart) => (
              <div key={cart.id} className={styles.featuredCard}>
                <div className={styles.featuredImage} style={{ backgroundImage: `url(${cart.images?.[0] || 'https://images.unsplash.com/photo-1593111774640-36e6557551cc?auto=format&fit=crop&w=800&q=80'})` }}></div>
                <div className={styles.featuredInfo}>
                  <h3>{cart.name}</h3>
                  <p>${cart.base_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
                </div>
                <Link href={`/shop/${cart.slug}`} className={styles.featuredBtn}>View Details</Link>
              </div>
            ))}
            {displayProducts.length === 0 && (
              <p style={{ textAlign: 'center', gridColumn: '1 / -1', padding: '2rem' }}>No featured products available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.featureGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><Truck size={32} /></div>
              <h3>Nationwide Delivery</h3>
              <p>Secure transport with full tracking directly to your driveway.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><ShieldCheck size={32} /></div>
              <h3>Comprehensive Warranty</h3>
              <p>Drive with confidence. Backed by our industry-leading guarantee.</p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}><CreditCard size={32} /></div>
              <h3>Flexible Financing</h3>
              <p>Get approved quickly and hit the road with low monthly payments.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseUs}>
        <div className="container">
          <FadeIn>
            <h2 className={styles.sectionTitle}>Why Choose Premier Carts</h2>
          </FadeIn>
          <div className={styles.wcuContainer}>
            
            {/* Block 1 */}
            <FadeIn>
              <div className={styles.wcuBlock}>
                <div className={styles.wcuImage} style={{ backgroundImage: 'url(https://images.pexels.com/photos/37721061/pexels-photo-37721061.jpeg)' }}></div>
                <div className={styles.wcuContent}>
                  <h3>Uncompromising Build Quality</h3>
                  <p>Every custom cart undergoes an exhaustive 32-point inspection spanning electrical diagnostics, torque validation, and alignment mapping. We don't just build carts; we engineer experiences designed to last.</p>
                </div>
              </div>
            </FadeIn>

            {/* Block 2 */}
            <FadeIn>
              <div className={`${styles.wcuBlock} ${styles.wcuReverse}`}>
                <div className={styles.wcuImage} style={{ backgroundImage: 'url(https://images.pexels.com/photos/9207191/pexels-photo-9207191.jpeg)' }}></div>
                <div className={styles.wcuContent}>
                  <h3>Custom Built for You</h3>
                  <p>From premium 48V Lithium-Ion power plants to custom-stitched marine-grade upholstery, our technicians refuse to cut corners. Your cart is a reflection of your lifestyle, built exactly to your specifications.</p>
                </div>
              </div>
            </FadeIn>

            {/* Block 3 */}
            <FadeIn>
              <div className={styles.wcuBlock}>
                <div className={styles.wcuImage} style={{ backgroundImage: 'url(https://images.pexels.com/photos/9366564/pexels-photo-9366564.jpeg)' }}></div>
                <div className={styles.wcuContent}>
                  <h3>Nationwide Delivery & Support</h3>
                  <p>Once your build is complete, our dedicated logistics team ensures a secure, tracked delivery directly to your driveway anywhere in the country. Plus, you're backed by our industry-leading warranty.</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonials}>
        <div className="container">
          <FadeIn>
            <h2 className={styles.sectionTitle}>What Our Riders Say</h2>
          </FadeIn>
          <div className={styles.testimonialGrid}>
            <FadeIn delay={0.1}>
              <div className={styles.testimonialCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>"The attention to detail on my custom Phantom build is insane. It's the talk of the neighborhood. Premier handled the shipping perfectly!"</p>
                <p className={styles.author}>— Michael T., Florida</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className={styles.testimonialCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>"We ordered 4 electric carts for our ranch. The lithium battery upgrade was worth every penny. Phenomenal torque and battery life."</p>
                <p className={styles.author}>— Sarah J., Texas</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className={styles.testimonialCard}>
                <div className={styles.stars}>★★★★★</div>
                <p className={styles.quote}>"Great customer service. I needed specific OEM parts for a rebuild and they sourced them within days. Highly recommended."</p>
                <p className={styles.author}>— David R., Georgia</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.ctaOverlay}></div>
        <div className={`container ${styles.ctaContent}`}>
          <h2>Ready to Build Your Dream Cart?</h2>
          <p>Contact our master builders today to discuss your exact specifications, or browse our ready-to-ship inventory.</p>
          <div className={styles.ctaButtons}>
            <Link href="/shop" className="btn btn-primary" style={{ backgroundColor: 'var(--accent-color)', color: 'var(--primary-color)' }}>View Inventory</Link>
            <Link href="/contact" className="btn" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white' }}>Contact Sales</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
