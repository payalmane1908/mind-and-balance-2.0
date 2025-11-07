const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MoodEntry = require('../models/MoodEntry');
const JournalEntry = require('../models/JournalEntry');
const Exercise = require('../models/Exercise');

// GET /api/dashboard - Personalized dashboard data
router.get('/', auth, async (req, res) => {
  try {
    const [moods, journals, topExercises] = await Promise.all([
      MoodEntry.find({ user: req.user._id }).sort({ timestamp: -1 }).limit(7),
      JournalEntry.find({ user: req.user._id }).sort({ timestamp: -1 }).limit(5),
      Exercise.find({}).sort({ completedCount: -1 }).limit(3)
    ]);

    const avgMood = moods.length ? moods.reduce((s, m) => s + m.moodScore, 0) / moods.length : 0;

    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        streak: req.user.streak,
        xpPoints: req.user.xpPoints
      },
      moodStats: {
        recent: moods,
        average: Number(avgMood.toFixed(2))
      },
      recentJournals: journals,
      recommendations: topExercises
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


