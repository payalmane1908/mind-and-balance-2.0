const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const MoodEntry = require('../models/MoodEntry');

// GET /api/moods - Get all moods for user
router.get('/', auth, async (req, res) => {
  try {
    const moods = await MoodEntry.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(moods);
  } catch (error) {
    console.error('Get moods error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/moods - Add new mood entry
router.post('/', auth, async (req, res) => {
  try {
    const { moodScore, note } = req.body;
    if (!moodScore || moodScore < 1 || moodScore > 10) {
      return res.status(400).json({ message: 'moodScore must be between 1 and 10' });
    }
    const entry = await MoodEntry.create({
      user: req.user._id,
      moodScore,
      note: note || ''
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error('Create mood error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/moods/stats - simple stats for last 7 days
router.get('/stats', auth, async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const entries = await MoodEntry.find({ user: req.user._id, timestamp: { $gte: sevenDaysAgo } });
    const avg = entries.length ? entries.reduce((s, e) => s + e.moodScore, 0) / entries.length : 0;
    res.json({ count: entries.length, average: Number(avg.toFixed(2)) });
  } catch (error) {
    console.error('Mood stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


