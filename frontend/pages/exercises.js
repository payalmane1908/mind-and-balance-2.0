import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Timer from '../components/Timer';
import styles from '../styles/Exercises.module.css';
import { exerciseService } from '../utils/api';

export default function Exercises() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeExercise, setActiveExercise] = useState(null);
  const [showTimer, setShowTimer] = useState(false);
  
  // Fallback content so the page works even if the backend is offline
  const defaultExercises = [
    {
      id: 'ex-yoga-1',
      title: 'Sun Salutation (Surya Namaskar)',
      description: 'A 10-pose flow to energize the body and calm the mind. Move with breath.',
      duration: '10 min',
      category: 'yoga'
    },
    {
      id: 'ex-yoga-2',
      title: "Cat–Cow (Marjaryasana–Bitilasana)",
      description: 'Gentle spinal warm-up to release tension and improve mobility.',
      duration: '5 min',
      category: 'yoga'
    },
    {
      id: 'ex-yoga-3',
      title: "Child's Pose (Balasana)",
      description: 'Restorative pose to relax the back, shoulders, and mind. Breathe deeply.',
      duration: '4 min',
      category: 'yoga'
    },
    {
      id: 'ex-breath-1',
      title: 'Box Breathing (4–4–4–4)',
      description: 'Inhale, hold, exhale, hold for 4 seconds each. Repeat to reduce stress.',
      duration: '5 min',
      category: 'breathing'
    },
    {
      id: 'ex-breath-2',
      title: 'Alternate Nostril Breathing (Nadi Shodhana)',
      description: 'Balance the nervous system by alternating nostrils with slow breaths.',
      duration: '6 min',
      category: 'breathing'
    },
    {
      id: 'ex-med-1',
      title: 'Body Scan Meditation',
      description: 'Gently scan from head to toe, noticing sensations without judgment.',
      duration: '8 min',
      category: 'meditation'
    },
    {
      id: 'ex-med-2',
      title: 'Loving-Kindness (Metta) Meditation',
      description: 'Cultivate compassion with phrases of goodwill for yourself and others.',
      duration: '10 min',
      category: 'meditation'
    },
    {
      id: 'ex-mind-1',
      title: 'Grounding 5–4–3–2–1',
      description: 'Use senses to name 5 things you see, 4 touch, 3 hear, 2 smell, 1 taste.',
      duration: '6 min',
      category: 'mindfulness'
    },
    {
      id: 'ex-stretch-1',
      title: 'Seated Forward Fold',
      description: 'Lengthen hamstrings and lower back; keep breath smooth and steady.',
      duration: '7 min',
      category: 'stretching'
    },
    {
      id: 'ex-relax-1',
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and release major muscle groups to ease physical and mental tension.',
      duration: '9 min',
      category: 'relaxation'
    }
  ];
  
  const categories = [
    { id: 'all', name: 'All Exercises' },
    { id: 'meditation', name: 'Meditation' },
    { id: 'breathing', name: 'Breathing' },
    { id: 'mindfulness', name: 'Mindfulness' },
    { id: 'yoga', name: 'Yoga' },
    { id: 'stretching', name: 'Stretching' },
    { id: 'relaxation', name: 'Relaxation' }
  ];
  
  useEffect(() => {
    const load = async () => {
      try {
        const res = await exerciseService.getExercises();
        const data = Array.isArray(res?.data) ? res.data : [];
        setItems(data.length ? data : defaultExercises);
      } catch (e) {
        // Fallback to local content when API is unavailable
        setItems(defaultExercises);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);
  
  const filteredExercises = selectedCategory === 'all' 
    ? items 
    : items.filter(exercise => exercise.category === selectedCategory);

  const startExercise = (exercise) => {
    setActiveExercise(exercise);
    setShowTimer(true);
  };

  const handleTimerComplete = () => {
    alert(`Great job! You've completed the ${activeExercise?.title} exercise.`);
    setShowTimer(false);
    setActiveExercise(null);
  };

  const handleTimerStop = () => {
    setShowTimer(false);
    setActiveExercise(null);
  };

  const getDurationInSeconds = (duration) => {
    if (typeof duration === 'string') {
      const match = duration.match(/(\d+)\s*min/);
      return match ? parseInt(match[1]) * 60 : 300; // default 5 minutes
    }
    return duration || 300;
  };

  return (
    <Layout title="Guided Exercises">
      <div className={styles.container}>
        <h1 className={styles.title}>Guided Exercises</h1>
        <p className={styles.subtitle}>Discover exercises to improve your mental wellbeing</p>
        
        <div className={styles.categories}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.activeCategory : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        {showTimer && activeExercise && (
          <div className={styles.timerSection}>
            <h2>Currently Active: {activeExercise.title}</h2>
            <Timer 
              duration={getDurationInSeconds(activeExercise.duration)}
              onComplete={handleTimerComplete}
              onStop={handleTimerStop}
              allowCustomDuration={true}
            />
          </div>
        )}

        <div className={styles.exercisesGrid}>
          {loading ? (
            <p>Loading...</p>
          ) : filteredExercises.length > 0 ? (
            filteredExercises.map(exercise => (
              <div key={exercise._id || exercise.id} className={styles.exerciseCard}>
                <div className={styles.exerciseHeader}>
                  <span className={styles.duration}>{exercise.duration || '5 min'}</span>
                  <span className={styles.category}>{exercise.category}</span>
                </div>
                <h3 className={styles.exerciseTitle}>{exercise.title}</h3>
                <p className={styles.exerciseDescription}>{exercise.description}</p>
                <button 
                  className={styles.startButton}
                  onClick={() => startExercise(exercise)}
                  disabled={showTimer}
                >
                  {showTimer ? 'Timer Active' : 'Start Exercise'}
                </button>
              </div>
            ))
          ) : (
            <p className={styles.emptyState}>No exercises found in this category.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}