'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, X, Loader2, AlertCircle } from 'lucide-react';
import styles from './AdminImageUploader.module.css';

type Slot = {
  url: string;     // final URL submitted with the form
  display: string; // what to show in the preview (blob or real URL)
  uploading: boolean;
  error: string;
};

function makeSlots(initial: string[]): Slot[] {
  return Array.from({ length: 5 }, (_, i) => ({
    url: initial[i] || '',
    display: initial[i] || '',
    uploading: false,
    error: '',
  }));
}

export default function AdminImageUploader({ initialUrls = [] }: { initialUrls?: string[] }) {
  const [slots, setSlots] = useState<Slot[]>(() => makeSlots(initialUrls));
  const [dragOver, setDragOver] = useState<number | null>(null);
  const fileRefs = useRef<(HTMLInputElement | null)[]>([]);

  const upload = useCallback(async (index: number, file: File) => {
    if (!file.type.startsWith('image/')) {
      setSlots(p => p.map((s, i) => i === index ? { ...s, error: 'Only image files are allowed.' } : s));
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setSlots(p => p.map((s, i) => i === index ? { ...s, error: 'Max file size is 10 MB.' } : s));
      return;
    }

    const blob = URL.createObjectURL(file);
    setSlots(p => p.map((s, i) => i === index ? { url: '', display: blob, uploading: true, error: '' } : s));

    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Upload failed');

      setSlots(p => p.map((s, i) => {
        if (i !== index) return s;
        URL.revokeObjectURL(blob);
        return { url: json.url, display: json.url, uploading: false, error: '' };
      }));
    } catch (err) {
      setSlots(p => p.map((s, i) => {
        if (i !== index) return s;
        URL.revokeObjectURL(blob);
        return { url: '', display: '', uploading: false, error: (err as Error).message };
      }));
    }
  }, []);

  const clear = (index: number) =>
    setSlots(p => p.map((s, i) => i === index ? { url: '', display: '', uploading: false, error: '' } : s));

  const pick = (index: number) => !slots[index].uploading && fileRefs.current[index]?.click();

  function onDrop(index: number, e: React.DragEvent) {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) upload(index, file);
  }

  function renderSlot(index: number, isMain = false) {
    const slot = slots[index];
    const cls = isMain ? styles.mainSlot : styles.slot;
    const label = isMain ? 'Main' : String(index + 1);

    return (
      <div
        key={index}
        className={`${cls} ${dragOver === index ? styles.dragOver : ''} ${slot.uploading ? styles.slotDisabled : ''}`}
        onClick={() => pick(index)}
        onDragOver={e => { e.preventDefault(); setDragOver(index); }}
        onDragLeave={() => setDragOver(null)}
        onDrop={e => onDrop(index, e)}
      >
        {/* Badge */}
        <span className={`${styles.badge} ${isMain ? styles.badgeMain : ''}`}>{label}</span>

        {slot.uploading ? (
          <div className={styles.uploadingState}>
            <Loader2 size={24} className={styles.spinner} />
            <span className={styles.uploadingLabel}>Uploading…</span>
            <div className={styles.progressBar}><div className={styles.progressFill} /></div>
          </div>
        ) : slot.display ? (
          <>
            <div className={styles.preview} style={{ backgroundImage: `url(${slot.display})` }} />
            <div className={styles.previewOverlay}><Upload size={14} /> Replace</div>
            <button
              type="button"
              className={styles.deleteBtn}
              onClick={e => { e.stopPropagation(); clear(index); }}
              aria-label="Remove image"
            >
              <X size={13} />
            </button>
          </>
        ) : (
          <div className={styles.emptyState}>
            <Upload size={isMain ? 28 : 22} className={styles.emptyIcon} />
            <span className={styles.emptyLabel}>{isMain ? 'Upload main image' : 'Add image'}</span>
            {isMain && <span className={styles.emptyHint}>Click or drag & drop</span>}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.uploader}>
      {/* Hidden form inputs — these carry the URLs into the server action */}
      {slots.map((slot, i) => (
        <input key={i} type="hidden" name={`image_url_${i + 1}`} value={slot.url} />
      ))}

      {/* Hidden file inputs */}
      {Array.from({ length: 5 }, (_, i) => (
        <input
          key={i}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          style={{ display: 'none' }}
          ref={el => { fileRefs.current[i] = el; }}
          onChange={e => {
            const file = e.target.files?.[0];
            if (file) upload(i, file);
            e.target.value = '';
          }}
        />
      ))}

      {/* Visual grid */}
      <div className={styles.grid}>
        {renderSlot(0, true)}
        {renderSlot(1)}
        {renderSlot(2)}
        {renderSlot(3)}
        {renderSlot(4)}
      </div>

      {/* Error messages */}
      {slots.map((slot, i) =>
        slot.error ? (
          <div key={i} className={styles.errorMsg}>
            <AlertCircle size={14} /> Image {i + 1}: {slot.error}
          </div>
        ) : null
      )}

      <p className={styles.hint}>
        JPEG, PNG, WebP or GIF · max 10 MB per image · images are stored securely in Supabase
      </p>
    </div>
  );
}
