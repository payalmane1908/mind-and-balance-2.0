import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/MoodTracker.module.css';
import { moodService } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function MoodTracker() {
  const [moodScore, setMoodScore] = useState(5);
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [history, setHistory] = useState([]);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert('Please login to save your mood.');
        return;
      }
      await moodService.addMoodEntry({ moodScore, note });
      const res = await moodService.getMoodHistory();
      setHistory(res.data);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
      setNote('');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await moodService.getMoodHistory();
        setHistory(res.data);
      } catch (error) {
        // ignore if not logged in yet
      }
    };
    fetchHistory();
  }, [user]);

  return (
    <Layout title="Mood Tracker">
      <div className={styles.container}>
        <h1 className={styles.title}>How are you feeling today?</h1>
        
        <div className={styles.moodTrackerCard}>
          {submitted ? (
            <div className={styles.successMessage}>
              <h3>Thank you for your entry!</h3>
              <p>Your mood has been recorded successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.moodForm}>
              <div className={styles.moodSlider}>
                <span>😔</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodScore}
                  onChange={(e) => setMoodScore(parseInt(e.target.value))}
                  className={styles.slider}
                />
                <span>😊</span>
              </div>
              
              <div className={styles.moodScore}>
                <span>Your mood: {moodScore}/10</span>
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="note">Add a note (optional)</label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's contributing to your mood today?"
                  rows="4"
                />
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Save Entry
              </button>
            </form>
          )}
        </div>
        
        <div className={styles.moodHistory}>
          <h2>Your Recent Moods</h2>
          {history.length === 0 ? (
            <p className={styles.emptyState}>
              Your mood history will appear here once you start tracking.
            </p>
          ) : (
            <div className={styles.historyList}>
              {history.slice(0, 10).map((m) => (
                <div key={m._id} className={styles.historyItem}>
                  <div className={styles.historyMood}>Mood: {m.moodScore}/10</div>
                  <div className={styles.historyNote}>{m.note}</div>
                  <div className={styles.historyDate}>{new Date(m.timestamp).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}