import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = process.env.RESEND_FROM_EMAIL || 'Premier Golf Carts <onboarding@resend.dev>';
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'bumahermann13@gmail.com';

const PAYMENT_LABELS: Record<string, string> = {
  cashapp: 'Cash App',
  applepay: 'Apple Pay',
  venmo: 'Venmo',
  chime: 'Chime',
  bank: 'Bank Transfer',
  crypto: 'Crypto',
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  slug: string;
}

function itemsTable(items: CartItem[]) {
  const rows = items.map(item => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;">${item.name}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${item.quantity}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
      <td style="padding:10px 12px;border-bottom:1px solid #e5e7eb;text-align:right;font-weight:600;">$${(item.price * item.quantity).toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
    </tr>`).join('');
  return `
    <table width="100%" style="border-collapse:collapse;margin-top:16px;">
      <thead>
        <tr style="background:#f3f4f6;">
          <th style="padding:10px 12px;text-align:left;font-size:12px;text-transform:uppercase;color:#6b7280;">Product</th>
          <th style="padding:10px 12px;text-align:center;font-size:12px;text-transform:uppercase;color:#6b7280;">Qty</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280;">Unit Price</th>
          <th style="padding:10px 12px;text-align:right;font-size:12px;text-transform:uppercase;color:#6b7280;">Subtotal</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function customerEmail(orderId: string, customer: Record<string, string>, items: CartItem[], total: number, paymentMethod: string) {
  const paymentLabel = PAYMENT_LABELS[paymentMethod] || paymentMethod;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);" cellpadding="0" cellspacing="0">

        <!-- Header -->
        <tr><td style="background:#0b1120;padding:32px 40px;text-align:center;">
          <h1 style="margin:0;color:#eab308;font-size:24px;letter-spacing:1px;">PREMIER CARTS</h1>
          <p style="margin:8px 0 0;color:#9ca3af;font-size:14px;">Order Confirmation</p>
        </td></tr>

        <!-- Body -->
        <tr><td style="padding:40px;">
          <h2 style="margin:0 0 8px;color:#0b1120;font-size:20px;">Your order is confirmed!</h2>
          <p style="margin:0 0 24px;color:#4b5563;font-size:15px;">Hi ${customer.name}, thank you for your order. We've received it and are awaiting your payment to begin processing.</p>

          <div style="background:#f9fafb;border-radius:6px;padding:16px 20px;margin-bottom:24px;">
            <p style="margin:0 0 4px;font-size:12px;font-weight:600;text-transform:uppercase;color:#6b7280;letter-spacing:.05em;">Order ID</p>
            <p style="margin:0;font-family:monospace;font-size:14px;color:#0b1120;font-weight:600;">${orderId}</p>
          </div>

          ${itemsTable(items)}

          <div style="text-align:right;margin-top:20px;padding-top:16px;border-top:2px solid #0b1120;">
            <span style="font-size:18px;font-weight:700;color:#0b1120;">Total: $${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          <div style="background:#fefce8;border:1px solid #fde68a;border-radius:6px;padding:20px;margin-top:28px;">
            <p style="margin:0 0 8px;font-weight:700;color:#92400e;font-size:15px;">Payment Method: ${paymentLabel}</p>
            <p style="margin:0;color:#78350f;font-size:14px;line-height:1.6;">
              Our team will contact you shortly with the payment details for <strong>${paymentLabel}</strong>.<br>
              Please have your Order ID <strong>${orderId}</strong> ready as a reference.
            </p>
          </div>

          <p style="margin:28px 0 0;color:#4b5563;font-size:14px;line-height:1.6;">
            Questions? Reply to this email or call us at <strong>(205) 304-0178</strong> Mon–Fri 9am–6pm EST.
          </p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="background:#f9fafb;padding:24px 40px;text-align:center;border-top:1px solid #e5e7eb;">
          <p style="margin:0;font-size:13px;color:#9ca3af;">© ${new Date().getFullYear()} Premier Golf Carts · contact@premiergolfcartssale.com</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function adminEmail(orderId: string, customer: Record<string, string>, items: CartItem[], total: number, paymentMethod: string) {
  const paymentLabel = PAYMENT_LABELS[paymentMethod] || paymentMethod;
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr><td align="center">
      <table width="620" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 4px 12px rgba(0,0,0,0.08);" cellpadding="0" cellspacing="0">

        <tr><td style="background:#0b1120;padding:24px 40px;">
          <h2 style="margin:0;color:#eab308;font-size:20px;">New Order Received</h2>
          <p style="margin:4px 0 0;color:#9ca3af;font-size:13px;">Order ID: ${orderId}</p>
        </td></tr>

        <tr><td style="padding:32px 40px;">

          <!-- Customer details -->
          <h3 style="margin:0 0 16px;color:#0b1120;font-size:16px;border-bottom:2px solid #eab308;padding-bottom:8px;">Customer Details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:6px 0;width:140px;font-size:13px;font-weight:600;color:#6b7280;">Name</td><td style="padding:6px 0;font-size:14px;color:#111827;">${customer.name}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;font-weight:600;color:#6b7280;">Email</td><td style="padding:6px 0;font-size:14px;color:#111827;"><a href="mailto:${customer.email}" style="color:#0b1120;">${customer.email}</a></td></tr>
            <tr><td style="padding:6px 0;font-size:13px;font-weight:600;color:#6b7280;">Phone</td><td style="padding:6px 0;font-size:14px;color:#111827;">${customer.phone || '—'}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;font-weight:600;color:#6b7280;">Address</td><td style="padding:6px 0;font-size:14px;color:#111827;">${customer.street}, ${customer.city}, ${customer.state} ${customer.zip}, ${customer.country}</td></tr>
            <tr><td style="padding:6px 0;font-size:13px;font-weight:600;color:#6b7280;">Payment</td><td style="padding:6px 0;font-size:14px;"><strong style="color:#0b1120;">${paymentLabel}</strong></td></tr>
          </table>

          <!-- Order items -->
          <h3 style="margin:28px 0 12px;color:#0b1120;font-size:16px;border-bottom:2px solid #eab308;padding-bottom:8px;">Order Items</h3>
          ${itemsTable(items)}

          <div style="text-align:right;margin-top:16px;padding-top:12px;border-top:2px solid #0b1120;">
            <span style="font-size:20px;font-weight:700;color:#0b1120;">Total: $${total.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          </div>

          <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:6px;padding:16px;margin-top:24px;">
            <p style="margin:0;font-size:14px;color:#166534;">Action required: confirm payment receipt via <strong>${paymentLabel}</strong> and update the order status in the admin panel.</p>
          </div>

        </td></tr>

        <tr><td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:13px;color:#9ca3af;">Premier Golf Carts Admin · ${new Date().toLocaleString('en-US')}</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const { customer, items, total, paymentMethod } = await request.json();

    if (!customer?.name || !customer?.email || !items?.length || !total || !paymentMethod) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Create the order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_email: customer.email,
        customer_phone: customer.phone || null,
        status: 'pending',
        total_amount: total,
        shipping_address: {
          name: customer.name,
          street: customer.street,
          city: customer.city,
          state: customer.state,
          zip: customer.zip,
          country: customer.country,
          payment_method: paymentMethod,
        },
      }])
      .select('id')
      .single();

    if (orderError || !order) {
      console.error('Order insert error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    const orderId: string = order.id;

    // Insert order items (look up product IDs by slug)
    const slugs: string[] = items.map((i: CartItem) => i.slug);
    const { data: products } = await supabase
      .from('products')
      .select('id, slug')
      .in('slug', slugs);

    const productMap = Object.fromEntries((products || []).map((p: { id: string; slug: string }) => [p.slug, p.id]));

    const orderItems = items.map((item: CartItem) => ({
      order_id: orderId,
      product_id: productMap[item.slug] || null,
      quantity: item.quantity,
      price_at_purchase: item.price,
      selected_options: [{ name: item.name }],
    }));

    await supabase.from('order_items').insert(orderItems);

    // Send emails (non-blocking — don't fail the order if email fails)
    const emailPromises = [
      resend.emails.send({
        from: FROM,
        to: [customer.email],
        subject: `Order Confirmed — #${orderId.slice(0, 8).toUpperCase()} | Premier Golf Carts`,
        html: customerEmail(orderId, customer, items, total, paymentMethod),
      }),
      resend.emails.send({
        from: FROM,
        to: [ADMIN_EMAIL],
        subject: `New Order $${total.toLocaleString('en-US', { minimumFractionDigits: 2 })} — ${PAYMENT_LABELS[paymentMethod] || paymentMethod} · #${orderId.slice(0, 8).toUpperCase()}`,
        html: adminEmail(orderId, customer, items, total, paymentMethod),
      }),
    ];

    await Promise.allSettled(emailPromises);

    return NextResponse.json({ orderId });
  } catch (err) {
    console.error('Checkout error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
