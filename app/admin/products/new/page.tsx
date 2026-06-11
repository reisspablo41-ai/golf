import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import styles from '../../admin.module.css';

export default function NewProductPage() {
  
  async function createProduct(formData: FormData) {
    'use server';
    
    const supabase = await createClient();
    
    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = formData.get('category') as string;
    const base_price = parseFloat(formData.get('base_price') as string);
    const inventory_count = parseInt(formData.get('inventory_count') as string, 10);
    const description = formData.get('description') as string;
    const images = [1, 2, 3, 4, 5]
      .map((n) => (formData.get(`image_url_${n}`) as string)?.trim())
      .filter(Boolean);

    const { error } = await supabase.from('products').insert([{
      name,
      slug,
      category,
      base_price,
      inventory_count,
      description,
      images,
    }]);

    if (error) {
      console.error('Error creating product:', error);
      // In a real app, you'd return this error to the client to show a toast
      return;
    }

    redirect('/admin/products');
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Add New Product</h1>
      </div>

      <div className={styles.formCard}>
        <form action={createProduct} className={styles.formGrid}>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Product Name</label>
            <input type="text" id="name" name="name" required placeholder="e.g., Phantom X-Series" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="category">Category</label>
            <select id="category" name="category" required>
              <option value="electric">Electric Carts</option>
              <option value="gas">Gas Powered Carts</option>
              <option value="custom">Custom Builds</option>
              <option value="parts">Parts</option>
              <option value="accessories">Accessories</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="base_price">Base Price ($)</label>
            <input type="number" id="base_price" name="base_price" required min="0" step="0.01" placeholder="12500.00" />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="inventory_count">Inventory Count</label>
            <input type="number" id="inventory_count" name="inventory_count" required min="0" defaultValue="1" />
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label>Product Images (up to 5 URLs)</label>
            {[1, 2, 3, 4, 5].map((n) => (
              <input key={n} type="url" name={`image_url_${n}`} placeholder={`Image ${n} URL${n === 1 ? ' (main)' : ' (optional)'}`} style={{ marginBottom: '0.5rem' }} />
            ))}
          </div>

          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="description">Description</label>
            <textarea id="description" name="description" rows={5} required placeholder="Product details..."></textarea>
          </div>

          <div className={styles.fullWidth} style={{ marginTop: '1rem' }}>
            <button type="submit" className="btn btn-primary">Save Product</button>
          </div>

        </form>
      </div>
    </div>
  );
}
