import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { name, email, phone, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from('contact_submissions').insert([{
    name,
    email,
    phone: phone || null,
    cart_model_interest: 'Custom Build',
    message,
  }]);

  if (error) {
    console.error('custom-build submission error:', error);
    return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
