import Link from 'next/link';
import { Plus, Image as ImageIcon } from 'lucide-react';
import styles from '../admin.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Products</h1>
          <p className={styles.pageSub}>{products?.length ?? 0} cart{products?.length !== 1 ? 's' : ''} in inventory</p>
        </div>
        <Link href="/admin/products/new" className={styles.btnPrimary} style={{ textDecoration: 'none' }}>
          <Plus size={16} /> Add Product
        </Link>
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableTopbar}>
          <span className={styles.tableTitle}>All Products</span>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Images</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? products.map(product => (
              <tr key={product.id}>
                <td>
                  <div className={styles.thumbStrip}>
                    {product.images && product.images.length > 0 ? (
                      product.images.slice(0, 4).map((img: string, i: number) => (
                        <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                          <div
                            className={styles.thumb}
                            style={{ backgroundImage: `url(${img})` }}
                            title={`Image ${i + 1}`}
                          />
                        </a>
                      ))
                    ) : (
                      <div className={styles.thumbEmpty}>
                        <ImageIcon size={14} />
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ fontWeight: 600 }}>{product.name}</td>
                <td><span className={styles.catBadge}>{product.category}</span></td>
                <td style={{ fontWeight: 600 }}>${Number(product.base_price).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                <td style={{ color: product.inventory_count > 0 ? '#16a34a' : '#dc2626', fontWeight: 600 }}>
                  {product.inventory_count > 0 ? product.inventory_count : 'Out'}
                </td>
                <td>
                  <Link href={`/admin/products/${product.id}/edit`} className={styles.actionLink}>
                    Edit
                  </Link>
                </td>
              </tr>
            )) : (
              <tr className={styles.emptyRow}>
                <td colSpan={6}>No products yet. Click &quot;Add Product&quot; to create one.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
