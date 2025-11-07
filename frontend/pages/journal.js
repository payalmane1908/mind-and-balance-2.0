import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import styles from '../styles/Journal.module.css';
import { journalService } from '../utils/api';
import { useAuth } from '../context/AuthContext';

export default function Journal() {
  const [entry, setEntry] = useState('');
  const [moodTag, setMoodTag] = useState('other');
  const [submitted, setSubmitted] = useState(false);
  const [entries, setEntries] = useState([]);
  const { user } = useAuth();

  const moodTags = [
    { value: 'happy', label: 'Happy 😊' },
    { value: 'calm', label: 'Calm 😌' },
    { value: 'neutral', label: 'Neutral 😐' },
    { value: 'anxious', label: 'Anxious 😟' },
    { value: 'sad', label: 'Sad 😢' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!user) {
        alert('Please login to save a journal entry.');
        return;
      }
      await journalService.addJournalEntry({ content: entry, moodTag });
      const res = await journalService.getJournalEntries();
      setEntries(res.data);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEntry('');
        setMoodTag('other');
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const loadEntries = async () => {
      try {
        const res = await journalService.getJournalEntries();
        setEntries(res.data);
      } catch (error) {
        // ignore if not authorized yet
      }
    };
    loadEntries();
  }, [user]);

  return (
    <Layout title="Journal">
      <div className={styles.container}>
        <h1 className={styles.title}>My Journal</h1>
        
        <div className={styles.journalCard}>
          {submitted ? (
            <div className={styles.successMessage}>
              <h3>Journal Entry Saved!</h3>
              <p>Your thoughts have been recorded successfully.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className={styles.journalForm}>
              <div className={styles.formGroup}>
                <label htmlFor="entry">What's on your mind today?</label>
                <textarea
                  id="entry"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="Write your thoughts here..."
                  rows="10"
                  required
                />
              </div>
              
              <div className={styles.moodTagGroup}>
                <label>How are you feeling?</label>
                <div className={styles.moodTags}>
                  {moodTags.map((mood) => (
                    <div 
                      key={mood.value}
                      className={`${styles.moodTag} ${moodTag === mood.value ? styles.activeMood : ''}`}
                      onClick={() => setMoodTag(mood.value)}
                    >
                      {mood.label}
                    </div>
                  ))}
                </div>
              </div>
              
              <button type="submit" className={styles.submitButton}>
                Save Journal Entry
              </button>
            </form>
          )}
        </div>
        
        <div className={styles.journalHistory}>
          <h2>Previous Entries</h2>
          {entries.length === 0 ? (
            <p className={styles.emptyState}>
              Your journal entries will appear here once you start writing.
            </p>
          ) : (
            <div className={styles.entriesList}>
              {entries.map((e) => (
                <div key={e._id} className={styles.entryItem}>
                  <div className={styles.entryHeader}>
                    <span className={styles.entryMood}>{e.moodTag}</span>
                    <span className={styles.entryDate}>{new Date(e.timestamp).toLocaleString()}</span>
                  </div>
                  <div className={styles.entryContent}>{e.content}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}