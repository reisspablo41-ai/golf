import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck } from 'lucide-react';
import styles from './page.module.css';
import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import AddToCartButton from '@/components/AddToCartButton';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const supabase = await createClient();
  const { data: product } = await supabase
    .from('products')
    .select('*, product_options(*)')
    .eq('slug', slug)
    .single();

  if (!product) {
    notFound();
  }

  const images = product.images?.length ? product.images : [
    'https://images.unsplash.com/photo-1593111774640-36e6557551cc?auto=format&fit=crop&w=1200&q=80'
  ];

  const specs = product.specifications || {};

  return (
    <div className="container" style={{ padding: '2rem 1.5rem 5rem' }}>
      <Link href="/shop" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Inventory
      </Link>

      <div className={styles.productLayout}>
        {/* Media Gallery */}
        <div className={styles.mediaGallery}>
          <div className={styles.mainImage} style={{ backgroundImage: `url(${images[0]})` }}></div>
          <div className={styles.thumbnailStrip}>
            {images.map((img: string, idx: number) => (
              <div key={idx} className={`${styles.thumbnail} ${idx === 0 ? styles.activeThumbnail : ''}`} style={{ backgroundImage: `url(${img})` }}></div>
            ))}
          </div>
          
          <div className={styles.specsCard}>
            <h3 className={styles.specsTitle}>Technical Specifications</h3>
            <ul className={styles.specsList}>
              {Object.entries(specs).map(([key, value]) => (
                <li key={key}>
                  <span className={styles.specKey}>{key}</span>
                  <span className={styles.specValue}>{value as string}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Configurator */}
        <div className={styles.configurator}>
          <div className={styles.productHeader}>
            <span className={styles.categoryBadge}>{product.category.toUpperCase()}</span>
            <h1 className={styles.productTitle}>{product.name}</h1>
            <p className={styles.productDescription}>{product.description}</p>
            <div className={styles.priceContainer}>
              <span className={styles.priceLabel}>Base Price</span>
              <span className={styles.priceValue}>${product.base_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className={styles.optionsSection}>
            <h3 className={styles.optionsTitle}>Power & Performance</h3>
            <div className={styles.optionGrid}>
              <label className={`${styles.optionCard} ${styles.selectedOption}`}>
                <input type="radio" name="battery" defaultChecked className={styles.srOnly} />
                <div className={styles.optionHeader}>
                  <span className={styles.optionName}>Standard Lead-Acid 48V</span>
                  <span className={styles.optionPrice}>Included</span>
                </div>
                <div className={styles.checkIcon}><Check size={16} /></div>
              </label>
              <label className={styles.optionCard}>
                <input type="radio" name="battery" className={styles.srOnly} />
                <div className={styles.optionHeader}>
                  <span className={styles.optionName}>High-Performance Lithium-Ion</span>
                  <span className={styles.optionPrice}>+$1,500</span>
                </div>
                <div className={styles.checkIcon}><Check size={16} /></div>
              </label>
            </div>
          </div>



          <div className={styles.checkoutSection}>
            <div className={styles.totalContainer}>
              <span>Total Price</span>
              <span className={styles.totalPrice}>${product.base_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            </div>
            <AddToCartButton
              className={`btn btn-primary ${styles.addToCartBtn}`}
              item={{
                id: product.id,
                slug: product.slug,
                name: product.name,
                price: product.base_price,
                image: images[0] ?? '',
              }}
            />
            <div className={styles.trustBadge}>
              <ShieldCheck size={20} className={styles.trustIcon} />
              <span>Includes 2-Year Limited Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
