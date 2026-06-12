import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/utils/supabase/admin';

const BUCKET = 'product-images';

export async function POST(request: NextRequest) {
  // Auth check
  const store = await cookies();
  if (store.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

  const admin = createAdminClient();

  // Verify the bucket exists — if not, return a clear actionable error
  const { data: bucket, error: bucketErr } = await admin.storage.getBucket(BUCKET);
  if (bucketErr || !bucket) {
    // Try to create it on the fly (works if service role has permission)
    const { error: createErr } = await admin.storage.createBucket(BUCKET, {
      public: true,
      fileSizeLimit: 10 * 1024 * 1024,
      allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'],
    });
    if (createErr) {
      return NextResponse.json(
        {
          error:
            `Storage bucket "${BUCKET}" does not exist. ` +
            `Run the storage SQL block in schema.sql via the Supabase Dashboard → SQL Editor.`,
        },
        { status: 500 }
      );
    }
  }

  // Build a safe file path
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const baseName = file.name
    .replace(/\.[^.]+$/, '')
    .replace(/[^a-z0-9]/gi, '-')
    .toLowerCase()
    .slice(0, 60);
  const path = `${Date.now()}-${baseName}.${ext}`;

  const bytes = await file.arrayBuffer();
  const { data, error } = await admin.storage
    .from(BUCKET)
    .upload(path, bytes, {
      contentType: file.type,
      cacheControl: '31536000',
      upsert: false,
    });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = admin.storage.from(BUCKET).getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
