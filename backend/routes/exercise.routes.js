const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Exercise = require('../models/Exercise');

// GET /api/exercises - Fetch exercises list
router.get('/', auth, async (req, res) => {
  try {
    const items = await Exercise.find({}).sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    console.error('Get exercises error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/exercises/category/:category
router.get('/category/:category', auth, async (req, res) => {
  try {
    const items = await Exercise.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    console.error('Get exercises by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/exercises/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Exercise.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Exercise not found' });
    res.json(item);
  } catch (error) {
    console.error('Get exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/exercises/:id/complete
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const item = await Exercise.findByIdAndUpdate(
      req.params.id,
      { $inc: { completedCount: 1 } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Exercise not found' });
    res.json(item);
  } catch (error) {
    console.error('Complete exercise error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


