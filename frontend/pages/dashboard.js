import Layout from '../components/Layout';
import styles from '../styles/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { dashboardService } from '../utils/api';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await dashboardService.getDashboardData();
        setData(res.data);
      } catch (e) {
        // ignore
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <Layout title="Dashboard">
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome back{data?.user?.name ? `, ${data.user.name}` : ''}!</h1>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3>Current Streak</h3>
            <div className={styles.statValue}>{data?.user?.streak ?? 0} days</div>
            <p>Keep it going!</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>XP Points</h3>
            <div className={styles.statValue}>{data?.user?.xpPoints ?? 0}</div>
            <div className={styles.progressBar}>
              <div 
                className={styles.progress} 
                style={{ width: `${((data?.user?.xpPoints ?? 0) / 500) * 100}%` }}
              ></div>
            </div>
            <p>{500 - (data?.user?.xpPoints ?? 0)} XP to next level</p>
          </div>
          
          <div className={styles.statCard}>
            <h3>Level</h3>
            <div className={styles.statValue}>{Math.floor(((data?.user?.xpPoints ?? 0) / 500)) + 1}</div>
            <p>Wellbeing Explorer</p>
          </div>
        </div>
        
        <div className={styles.dashboardGrid}>
          <div className={styles.moodChart}>
            <h2>Your Mood This Week</h2>
            <div className={styles.chartContainer}>
              {(data?.moodStats?.recent || []).map((m, index) => (
                <div key={index} className={styles.chartColumn}>
                  <div 
                    className={styles.chartBar} 
                    style={{ height: `${(m.moodScore || 0) * 10}%` }}
                  ></div>
                  <div className={styles.chartLabel}>{new Date(m.timestamp).toLocaleDateString(undefined, { weekday: 'short' })}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.recommendationsCard}>
            <h2>Recommended For You</h2>
            <div className={styles.recommendationsList}>
              {(data?.recommendations || []).map((ex) => (
                <div key={ex._id} className={styles.recommendationItem}>
                  <h4>{ex.title}</h4>
                  <p>{ex.description}</p>
                  <button className={styles.actionButton}>Start Now</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}