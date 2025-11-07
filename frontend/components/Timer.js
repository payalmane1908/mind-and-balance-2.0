import { useState, useEffect, useRef } from 'react';
import styles from '../styles/Timer.module.css';

export default function Timer({ duration, onComplete, onStop, allowCustomDuration = true }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showCustomDuration, setShowCustomDuration] = useState(false);
  const [customMinutes, setCustomMinutes] = useState(Math.floor(duration / 60));
  const [customSeconds, setCustomSeconds] = useState(duration % 60);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            onComplete && onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning, isPaused, onComplete]);

  const startTimer = () => {
    setIsRunning(true);
    setIsPaused(false);
  };

  const pauseTimer = () => {
    setIsPaused(true);
  };

  const resumeTimer = () => {
    setIsPaused(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(duration);
    onStop && onStop();
  };

  const setCustomTime = () => {
    const newDuration = (customMinutes * 60) + customSeconds;
    setTimeLeft(newDuration);
    setShowCustomDuration(false);
  };

  const resetToOriginal = () => {
    setTimeLeft(duration);
    setCustomMinutes(Math.floor(duration / 60));
    setCustomSeconds(duration % 60);
    setShowCustomDuration(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  return (
    <div className={styles.timerContainer}>
      <div className={styles.timerDisplay}>
        <div className={styles.timeText}>{formatTime(timeLeft)}</div>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {showCustomDuration && allowCustomDuration && (
        <div className={styles.customDurationSection}>
          <h4>Set Custom Duration</h4>
          <div className={styles.durationInputs}>
            <div className={styles.inputGroup}>
              <label>Minutes:</label>
              <input
                type="number"
                min="0"
                max="59"
                value={customMinutes}
                onChange={(e) => setCustomMinutes(parseInt(e.target.value) || 0)}
                className={styles.durationInput}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Seconds:</label>
              <input
                type="number"
                min="0"
                max="59"
                value={customSeconds}
                onChange={(e) => setCustomSeconds(parseInt(e.target.value) || 0)}
                className={styles.durationInput}
              />
            </div>
          </div>
          <div className={styles.customDurationControls}>
            <button className={styles.setTimeButton} onClick={setCustomTime}>
              Set Time
            </button>
            <button className={styles.cancelButton} onClick={resetToOriginal}>
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className={styles.timerControls}>
        {!isRunning ? (
          <button className={styles.startButton} onClick={startTimer}>
            Start
          </button>
        ) : isPaused ? (
          <button className={styles.resumeButton} onClick={resumeTimer}>
            Resume
          </button>
        ) : (
          <button className={styles.pauseButton} onClick={pauseTimer}>
            Pause
          </button>
        )}
        
        {isRunning && (
          <button className={styles.stopButton} onClick={stopTimer}>
            Stop
          </button>
        )}

        {allowCustomDuration && !isRunning && (
          <button 
            className={styles.customButton} 
            onClick={() => setShowCustomDuration(!showCustomDuration)}
          >
            {showCustomDuration ? 'Hide Custom' : 'Custom Time'}
          </button>
        )}
      </div>
    </div>
  );
}
