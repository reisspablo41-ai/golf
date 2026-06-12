import Link from 'next/link';
import styles from './page.module.css';
import { SlidersHorizontal } from 'lucide-react';
import { createClient } from '@/utils/supabase/server';
import { getDiscount, applyDiscount } from '@/utils/discount';

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string, sort?: string }>
}) {
  const { category, sort } = await searchParams;

  const supabase = await createClient();
  let query = supabase.from('products').select('*');

  if (category) {
    query = query.eq('category', category);
  }

  // Basic sorting logic (you can expand this based on the 'sort' param)
  if (sort === 'price-asc') {
    query = query.order('base_price', { ascending: true });
  } else if (sort === 'price-desc') {
    query = query.order('base_price', { ascending: false });
  } else {
    query = query.order('created_at', { ascending: false }); // default to newest
  }

  const { data: products } = await query;
  const filteredProducts = products || [];
  const discount = await getDiscount();

  const fmt = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2 });

  return (
    <div className="container" style={{ padding: '3rem 1.5rem' }}>
      <div className={styles.shopHeader}>
        <h1 className={styles.pageTitle}>
          {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Inventory` : 'All Inventory'}
        </h1>
        <div className={styles.shopControls}>
          <button className={`btn ${styles.controlBtn}`}><SlidersHorizontal size={18} /> Filters</button>
          <select className={styles.sortSelect} defaultValue={sort || 'featured'}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {discount.active && discount.percent > 0 && (
        <div className={styles.discountBanner}>
          <span className={styles.discountTag}>{discount.label} — {discount.percent}% OFF</span>
          <span>Sitewide discount applied to all products. Limited time only.</span>
        </div>
      )}

      <div className={styles.shopLayout}>
        <aside className={styles.sidebar}>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Category</h3>
            <div className={styles.filterOptions}>
              <Link href="/shop" className={!category ? styles.activeFilter : ''}>All Products</Link>
              <Link href="/shop?category=electric" className={category === 'electric' ? styles.activeFilter : ''}>Electric</Link>
              <Link href="/shop?category=gas" className={category === 'gas' ? styles.activeFilter : ''}>Gas Powered</Link>
              <Link href="/shop?category=custom" className={category === 'custom' ? styles.activeFilter : ''}>Custom Builds</Link>
              <Link href="/shop?category=parts" className={category === 'parts' ? styles.activeFilter : ''}>Parts & Accessories</Link>
            </div>
          </div>
          <div className={styles.filterGroup}>
            <h3 className={styles.filterTitle}>Price Range</h3>
            <div className={styles.priceInputs}>
              <input type="number" placeholder="Min" className={styles.priceInput} />
              <span>-</span>
              <input type="number" placeholder="Max" className={styles.priceInput} />
            </div>
          </div>
        </aside>

        <main className={styles.productGrid}>
          {filteredProducts.map(product => {
            const original = Number(product.base_price);
            const sale = applyDiscount(original, discount);
            const hasDiscount = discount.active && discount.percent > 0;
            return (
              <Link href={`/shop/${product.slug}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImageContainer} style={{ backgroundImage: `url(${product.images?.[0] || 'https://images.unsplash.com/photo-1593111774240-d529f12cb416?auto=format&fit=crop&w=800&q=80'})` }}>
                  {hasDiscount && (
                    <span className={styles.discountBadge}>{discount.percent}% OFF</span>
                  )}
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.productCategory}>{product.category.toUpperCase()}</span>
                  <h3 className={styles.productName}>{product.name}</h3>
                  {hasDiscount ? (
                    <p className={styles.productPrice}>
                      <span className={styles.originalPrice}>${fmt(original)}</span>
                      <span className={styles.salePrice}>${fmt(sale)}</span>
                    </p>
                  ) : (
                    <p className={styles.productPrice}>${fmt(original)}</p>
                  )}
                </div>
              </Link>
            );
          })}
          {filteredProducts.length === 0 && (
            <div className={styles.emptyState}>
              <p>No products found in this category.</p>
              <Link href="/shop" className="btn btn-primary" style={{ marginTop: '1rem' }}>View All</Link>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
