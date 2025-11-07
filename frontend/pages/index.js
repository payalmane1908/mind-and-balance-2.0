import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  return (
    <div className={styles.container}>
      <Head>
        <title>Mind and Balance - Mental Wellbeing Platform</title>
        <meta name="description" content="A calming, gamified mental health and wellbeing platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>BalanceMind</span>
        </h1>
        
        <p className={styles.description}>
          Your journey to mental wellbeing starts here
        </p>

        <div className={styles.inspirationalQuote}>
          "The greatest glory in living lies not in never falling, but in rising every time we fall."
        </div>

        <div className={styles.grid}>
          <Link href="/mood-tracker" className={styles.card}>
            <h2>Track Mood &rarr;</h2>
            <p>Check in with your daily emotions and track your progress.</p>
          </Link>

          <Link href="/journal" className={styles.card}>
            <h2>Start Journal &rarr;</h2>
            <p>Express your thoughts and feelings in a safe, private space.</p>
          </Link>

          <Link href="/exercises" className={styles.card}>
            <h2>Guided Exercises &rarr;</h2>
            <p>Discover mindfulness, meditation, and breathing exercises.</p>
          </Link>

          <Link href="/self-care" className={styles.card}>
            <h2>Self-Care Library &rarr;</h2>
            <p>Explore resources for sleep, stress, and relationships.</p>
          </Link>
        </div>
        {!user && (
          <div className={styles.ctaRow}>
            <Link href="/auth/login" className={styles.primaryCta}>Login</Link>
            <Link href="/auth/signup" className={styles.secondaryCta}>Create Account</Link>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>BalanceMind - Your Mental Wellbeing Companion</p>
      </footer>
    </div>
  );
}