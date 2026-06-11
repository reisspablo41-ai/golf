import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default function AdminLogin() {
  async function loginAction(formData: FormData) {
    'use server';
    const password = formData.get('password') as string;
    const envPassword = process.env.ADMIN_PASSWORD;

    if (password === envPassword) {
      const cookieStore = await cookies();
      cookieStore.set('admin_auth', password, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production',
        path: '/admin',
        maxAge: 60 * 60 * 24 * 7 // 1 week
      });
      redirect('/admin');
    } else {
      redirect('/admin/login?error=true');
    }
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--background-alt)' }}>
      <div style={{ backgroundColor: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary-color)' }}>Admin Access</h1>
        <form action={loginAction} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor="password" style={{ fontWeight: 500 }}>Password</label>
            <input 
              type="password" 
              name="password" 
              id="password" 
              required 
              style={{ padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} 
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Sign In</button>
        </form>
      </div>
    </div>
  );
}
