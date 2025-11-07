import styles from '../styles/Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} BalanceMind - Your Mental Wellbeing Companion</p>
    </footer>
  );
}