'use client';

import { useFormStatus } from 'react-dom';
import styles from '../admin.module.css';

export default function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" className={styles.loginSubmit} disabled={pending}>
      {pending ? (
        <span className={styles.loginSpinner} />
      ) : (
        'Sign In'
      )}
    </button>
  );
}
