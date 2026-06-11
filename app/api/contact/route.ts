import { NextResponse } from 'next/server';
import { Resend } from 'resend';
// import { createClient } from '@/utils/supabase/server';

// Initialize Resend
// const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Insert into Supabase (mocked for now)
    // const supabase = await createClient();
    // const { error: dbError } = await supabase
    //   .from('contact_submissions')
    //   .insert([{ name, email, phone, cart_model_interest: interest, message }]);
    
    // if (dbError) throw dbError;

    // 2. Send Email via Resend (mocked for now to avoid crashes if no API key is provided)
    /*
    await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>', // Change to your verified domain when ready
      to: ['contact@premiergolfcartssale.com'],
      subject: `New Lead: ${interest} Inquiry from ${name}`,
      html: `
        <h2>New Contact Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Interest:</strong> ${interest || 'N/A'}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });
    */

    console.log('Received contact submission:', body);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
