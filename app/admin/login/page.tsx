import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { Zap } from 'lucide-react';
import styles from '../admin.module.css';
import LoginButton from './LoginButton';

export default async function AdminLogin({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  async function loginAction(formData: FormData) {
    'use server';
    const password = formData.get('password') as string;
    if (password === process.env.ADMIN_PASSWORD) {
      const store = await cookies();
      store.set('admin_auth', password, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      redirect('/admin');
    } else {
      redirect('/admin/login?error=true');
    }
  }

  return (
    <div className={styles.loginWrap}>
      <div className={styles.loginCard}>

        <div className={styles.loginCardTop}>
          <div className={styles.loginLogo}><Zap size={24} /></div>
          <h1 className={styles.loginTitle}>Premier Carts Admin</h1>
          <p className={styles.loginSub}>Enter your password to continue</p>
        </div>

        <form action={loginAction} className={styles.loginForm}>
          {error && (
            <div className={styles.loginError}>
              Incorrect password. Please try again.
            </div>
          )}

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.formLabel}>Admin Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              placeholder="••••••••••••"
              className={styles.formInput}
            />
          </div>

          <LoginButton />
        </form>

      </div>
    </div>
  );
}
