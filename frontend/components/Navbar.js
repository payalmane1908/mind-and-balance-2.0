import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          BalanceMind
        </Link>
      </div>
      
      <div className={styles.links}>
        <Link href="/dashboard" className={router.pathname === '/dashboard' ? styles.active : ''}>
          Dashboard
        </Link>
        <Link href="/mood-tracker" className={router.pathname === '/mood-tracker' ? styles.active : ''}>
          Mood Tracker
        </Link>
        <Link href="/journal" className={router.pathname === '/journal' ? styles.active : ''}>
          Journal
        </Link>
        <Link href="/exercises" className={router.pathname === '/exercises' ? styles.active : ''}>
          Exercises
        </Link>
        <Link href="/self-care" className={router.pathname === '/self-care' ? styles.active : ''}>
          Self-Care
        </Link>
        <Link href="/affirmations" className={router.pathname === '/affirmations' ? styles.active : ''}>
          Affirmations
        </Link>
        <Link href="/chatbot" className={router.pathname === '/chatbot' ? styles.active : ''}>
          AI Support
        </Link>
      </div>
      
      <div className={styles.auth}>
        {user ? (
          <>
            <span className={styles.welcome}>Hi, {user.name || 'Friend'}</span>
            <button className={styles.loginBtn} onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/auth/login" className={styles.loginBtn}>
              Login
            </Link>
            <Link href="/auth/signup" className={styles.signupBtn}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}