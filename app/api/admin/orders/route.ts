import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createAdminClient } from '@/utils/supabase/admin';

export async function PATCH(request: NextRequest) {
  const store = await cookies();
  if (store.get('admin_auth')?.value !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id, status } = await request.json();
  const validStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  if (!id || !validStatuses.includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('orders').update({ status }).eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
