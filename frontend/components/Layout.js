import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from '../styles/Layout.module.css';

export default function Layout({ children, title = 'BalanceMind' }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{String(title)} - Mental Wellbeing Platform</title>
        <meta name="description" content="A calming, gamified mental health and wellbeing platform" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />
      
      <main className={styles.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}