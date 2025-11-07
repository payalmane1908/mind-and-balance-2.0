import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Custom404() {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - Page Not Found | BalanceMind</title>
        <meta name="description" content="Page not found" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          404 - Page Not Found
        </h1>
        
        <p className={styles.description}>
          The page you're looking for doesn't exist.
        </p>

        <div className={styles.grid}>
          <Link href="/" className={styles.card}>
            <h2>Go Home &rarr;</h2>
            <p>Return to the main page</p>
          </Link>

          <Link href="/auth/login" className={styles.card}>
            <h2>Login &rarr;</h2>
            <p>Sign in to your account</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
