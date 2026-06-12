import { Save, Tag, Info } from 'lucide-react';
import styles from '../admin.module.css';
import { createAdminClient } from '@/utils/supabase/admin';
import { revalidatePath } from 'next/cache';

export default async function AdminSettingsPage() {
  const admin = createAdminClient();

  // Load current settings (or defaults if row doesn't exist yet)
  const { data: settings } = await admin
    .from('site_settings')
    .select('*')
    .eq('id', 'global')
    .single();

  const discountActive  = settings?.discount_active  ?? false;
  const discountPercent = settings?.discount_percent  ?? 0;
  const discountLabel   = settings?.discount_label   ?? 'Sale';

  async function saveSettings(formData: FormData) {
    'use server';
    const adminClient = createAdminClient();
    const discount_active  = formData.get('discount_active') === 'on';
    const discount_percent = Math.min(100, Math.max(0, parseFloat(formData.get('discount_percent') as string) || 0));
    const discount_label   = (formData.get('discount_label') as string).trim() || 'Sale';

    await adminClient.from('site_settings').upsert({
      id: 'global',
      discount_active,
      discount_percent,
      discount_label,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

    revalidatePath('/', 'layout');
  }

  return (
    <div className={styles.formShell}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Site Settings</h1>
          <p className={styles.pageSub}>Configure sitewide pricing and promotions.</p>
        </div>
      </div>

      <form action={saveSettings}>
        <div className={styles.formCard}>

          {/* Discount section */}
          <div className={styles.formSection}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
              <Tag size={16} style={{ color: '#eab308' }} />
              <p className={styles.formSectionTitle} style={{ margin: 0 }}>Sitewide Discount</p>
            </div>

            {/* Toggle */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '1.25rem' }}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9375rem', color: '#0f172a' }}>Enable Discount</p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8125rem', color: '#64748b' }}>
                  When active, all product prices show the discounted rate alongside the original.
                </p>
              </div>
              <label style={{ position: 'relative', display: 'inline-block', width: '48px', height: '26px', flexShrink: 0 }}>
                <input
                  type="checkbox"
                  name="discount_active"
                  defaultChecked={discountActive}
                  style={{ opacity: 0, width: 0, height: 0 }}
                />
                <span style={{
                  position: 'absolute', inset: 0, borderRadius: '13px', cursor: 'pointer',
                  background: discountActive ? '#eab308' : '#d1d5db', transition: '0.2s',
                }} />
              </label>
            </div>

            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Discount Percentage (%)</label>
                <input
                  type="number"
                  name="discount_percent"
                  min="0"
                  max="100"
                  step="0.5"
                  defaultValue={discountPercent}
                  placeholder="e.g. 15"
                  className={styles.formInput}
                />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Enter a value between 0 and 100
                </span>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Discount Badge Label</label>
                <input
                  type="text"
                  name="discount_label"
                  defaultValue={discountLabel}
                  placeholder="e.g. Summer Sale"
                  maxLength={30}
                  className={styles.formInput}
                />
                <span style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                  Shown next to the discounted price on product cards
                </span>
              </div>
            </div>

            {/* Preview */}
            {discountPercent > 0 && (
              <div style={{ marginTop: '1.25rem', padding: '1rem 1.25rem', background: '#fefce8', border: '1px solid #fde68a', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Info size={16} style={{ color: '#ca8a04', flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#78350f' }}>
                  Preview: a $10,000 cart would show{' '}
                  <s style={{ color: '#94a3b8' }}>${(10000).toLocaleString('en-US', { minimumFractionDigits: 2 })}</s>{' '}
                  <strong>${(10000 * (1 - discountPercent / 100)).toLocaleString('en-US', { minimumFractionDigits: 2 })}</strong>{' '}
                  <span style={{ background: '#dc2626', color: 'white', fontSize: '0.6875rem', fontWeight: 700, padding: '0.125rem 0.4rem', borderRadius: '4px' }}>
                    {discountLabel} {discountPercent}% OFF
                  </span>
                </p>
              </div>
            )}
          </div>

        </div>

        <div className={styles.formActions}>
          <button type="submit" className={`${styles.btnPrimary} ${styles.btnGold}`}>
            <Save size={15} /> Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
