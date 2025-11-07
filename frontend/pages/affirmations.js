import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Affirmations.module.css';
import { FaHeart, FaRandom, FaBookmark } from 'react-icons/fa';
import { api } from '../utils/api';

const Affirmations = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState('');
  const [savedAffirmations, setSavedAffirmations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock affirmations data (would normally come from API)
  const affirmations = [
    "I am worthy of love and respect.",
    "I trust myself to make the right decisions.",
    "I am becoming better every day.",
    "My potential is limitless, and I can achieve anything I desire.",
    "I am in charge of my life and my happiness.",
    "I release all negativity and embrace positivity.",
    "I am grateful for everything I have in my life.",
    "I am confident in my abilities and skills.",
    "I am at peace with my past and excited for my future.",
    "I am enough just as I am.",
    "My mental health is a priority, and I honor my needs.",
    "I choose to focus on what I can control.",
    "I am resilient and can overcome any challenge.",
    "I deserve to take care of myself.",
    "My thoughts and feelings are valid."
  ];

  useEffect(() => {
    // Simulate API call to get a random affirmation
    getRandomAffirmation();
    // Load saved affirmations from localStorage
    const saved = localStorage.getItem('savedAffirmations');
    if (saved) {
      setSavedAffirmations(JSON.parse(saved));
    }
    setIsLoading(false);
  }, []);

  const getRandomAffirmation = () => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    setCurrentAffirmation(affirmations[randomIndex]);
  };

  const saveAffirmation = () => {
    if (!savedAffirmations.includes(currentAffirmation)) {
      const newSaved = [...savedAffirmations, currentAffirmation];
      setSavedAffirmations(newSaved);
      localStorage.setItem('savedAffirmations', JSON.stringify(newSaved));
    }
  };

  const removeSavedAffirmation = (affirmation) => {
    const newSaved = savedAffirmations.filter(item => item !== affirmation);
    setSavedAffirmations(newSaved);
    localStorage.setItem('savedAffirmations', JSON.stringify(newSaved));
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Daily Affirmations</h1>
        
        <div className={styles.affirmationCard}>
          <p className={styles.affirmationText}>{currentAffirmation}</p>
          <div className={styles.actionButtons}>
            <button 
              className={styles.actionButton} 
              onClick={getRandomAffirmation}
              aria-label="Get new affirmation"
            >
              <FaRandom />
              <span>New</span>
            </button>
            <button 
              className={styles.actionButton} 
              onClick={saveAffirmation}
              aria-label="Save affirmation"
              disabled={savedAffirmations.includes(currentAffirmation)}
            >
              <FaBookmark />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className={styles.savedSection}>
          <h2 className={styles.sectionTitle}>My Saved Affirmations</h2>
          {savedAffirmations.length === 0 ? (
            <p className={styles.emptyMessage}>You haven't saved any affirmations yet.</p>
          ) : (
            <ul className={styles.savedList}>
              {savedAffirmations.map((affirmation, index) => (
                <li key={index} className={styles.savedItem}>
                  <p>{affirmation}</p>
                  <button 
                    className={styles.removeButton}
                    onClick={() => removeSavedAffirmation(affirmation)}
                    aria-label="Remove saved affirmation"
                  >
                    <FaHeart />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Affirmations;