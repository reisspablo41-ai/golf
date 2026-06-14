import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createAdminClient } from '@/utils/supabase/admin';
import AdminImageUploader from '@/components/AdminImageUploader';
import styles from '../../admin.module.css';

export default function NewProductPage() {

  async function createProduct(formData: FormData) {
    'use server';
    const supabase = createAdminClient();

    const name = formData.get('name') as string;
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const category = formData.get('category') as string;
    const base_price = parseFloat(formData.get('base_price') as string);
    const inventory_count = parseInt(formData.get('inventory_count') as string, 10);
    const description = formData.get('description') as string;
    const images = [1, 2, 3, 4, 5]
      .map(n => (formData.get(`image_url_${n}`) as string)?.trim())
      .filter(Boolean);

    const { error } = await supabase.from('products').insert([{
      name, slug, category, base_price, inventory_count, description, images,
    }]);

    if (error) { console.error(error); return; }
    redirect('/admin/products');
  }

  return (
    <div className={styles.formShell}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Add New Product</h1>
          <p className={styles.pageSub}>Fill in the details below to list a new cart.</p>
        </div>
        <Link href="/admin/products" className={styles.btnOutline}><ArrowLeft size={15} /> Back</Link>
      </div>

      <form action={createProduct}>
        <div className={styles.formCard}>

          <div className={styles.formSection}>
            <p className={styles.formSectionTitle}>Basic Info</p>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>Product Name</label>
                <input type="text" id="name" name="name" required placeholder="e.g., Phantom X-Series" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="category" className={styles.formLabel}>Category</label>
                <select id="category" name="category" required className={styles.formSelect}>
                  <option value="electric">Electric Carts</option>
                  <option value="gas">Gas Powered Carts</option>
                  <option value="custom">Custom Builds</option>
                  <option value="parts">Parts</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="base_price" className={styles.formLabel}>Base Price ($)</label>
                <input type="number" id="base_price" name="base_price" required min="0" step="0.01" placeholder="12500.00" className={styles.formInput} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="inventory_count" className={styles.formLabel}>Inventory Count</label>
                <input type="number" id="inventory_count" name="inventory_count" required min="0" defaultValue="1" className={styles.formInput} />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <p className={styles.formSectionTitle}>Description</p>
            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Product Details</label>
              <textarea id="description" name="description" rows={5} required placeholder="Describe features, specs, and condition..." className={styles.formTextarea} />
            </div>
          </div>

          <div className={styles.formSection}>
            <p className={styles.formSectionTitle}>Product Images</p>
            <AdminImageUploader />
          </div>

        </div>

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.btnPrimary} ${styles.btnGold}`}><Save size={15} /> Save Product</button>
          <Link href="/admin/products" className={styles.btnOutline}>Cancel</Link>
        </div>
      </form>
    </div>
  );
}
