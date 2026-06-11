import Link from 'next/link';
import { Plus } from 'lucide-react';
import styles from '../admin.module.css';
import { createClient } from '@/utils/supabase/server';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const { data: products } = await supabase.from('products').select('*').order('created_at', { ascending: false });

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Manage Products</h1>
        <Link href="/admin/products/new" className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }}>
          <Plus size={18} /> Add Product
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Base Price</th>
              <th>Inventory</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {product.images && product.images.length > 0 ? (
                        product.images.map((img: string, i: number) => (
                          <a key={i} href={img} target="_blank" rel="noopener noreferrer">
                            <div style={{ width: '40px', height: '40px', backgroundImage: `url(${img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px', border: '1px solid var(--border-color)', flexShrink: 0 }} title={`Image ${i + 1}`} />
                          </a>
                        ))
                      ) : (
                        <div style={{ width: '40px', height: '40px', backgroundColor: 'var(--background-alt)', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                      )}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{product.name}</td>
                  <td><span style={{ textTransform: 'capitalize' }}>{product.category}</span></td>
                  <td>${product.base_price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
                  <td>{product.inventory_count}</td>
                  <td>
                    <Link href={`/admin/products/${product.id}/edit`} style={{ color: 'var(--primary-color)', fontWeight: 600, textDecoration: 'none' }}>
                      Edit
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  No products found. Click "Add Product" to create one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
