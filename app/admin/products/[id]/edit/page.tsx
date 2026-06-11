import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import styles from '../../../admin.module.css';

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase.from('products').select('*').eq('id', id).single();

  if (!product) {
    redirect('/admin/products');
  }

  async function updateProduct(formData: FormData) {
    'use server';
    const supabaseClient = await createClient();
    
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const base_price = parseFloat(formData.get('base_price') as string);
    const inventory_count = parseInt(formData.get('inventory_count') as string, 10);
    const description = formData.get('description') as string;
    const images = [1, 2, 3, 4, 5]
      .map((n) => (formData.get(`image_url_${n}`) as string)?.trim())
      .filter(Boolean);

    const { error } = await supabaseClient.from('products').update({
      name,
      category,
      base_price,
      inventory_count,
      description,
      images,
    }).eq('id', id);

    if (error) {
      console.error('Error updating product:', error);
      return;
    }

    redirect('/admin/products');
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit Product</h1>
      </div>

      <div className={styles.formCard}>
        <form action={updateProduct} className={styles.formGrid}>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" required defaultValue={product.name} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required defaultValue={product.category}>
              <option value="electric">Electric Carts</option>
              <option value="gas">Gas Powered Carts</option>
              <option value="custom">Custom Builds</option>
              <option value="parts">Parts</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="base_price">Base Price ($)</label>
            <input type="number" id="base_price" name="base_price" required min="0" step="0.01" defaultValue={product.base_price} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="inventory_count">Inventory Count</label>
            <input type="number" id="inventory_count" name="inventory_count" required min="0" defaultValue={product.inventory_count} />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Product Images (up to 5 URLs)</label>
            {[1, 2, 3, 4, 5].map((n) => (
              <input key={n} type="url" name={`image_url_${n}`} placeholder={`Image ${n} URL${n === 1 ? ' (main)' : ' (optional)'}`} defaultValue={product.images?.[n - 1] || ''} style={{ marginBottom: '0.5rem' }} />
            ))}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={5} required defaultValue={product.description}></textarea>
          </div>

          <div className={styles.fullWidth} style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
            <button type="submit" className="btn btn-primary">Update Product</button>
            <a href="/admin/products" className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}>Cancel</a>
          </div>

        </form>
      </div>
    </div>
  );
}
