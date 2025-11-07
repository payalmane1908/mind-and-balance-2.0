const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Affirmation = require('../models/Affirmation');

// GET /api/affirmations - Fetch list or random today
router.get('/', auth, async (req, res) => {
  try {
    const items = await Affirmation.find({}).sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (error) {
    console.error('Get affirmations error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/affirmations/category/:category
router.get('/category/:category', auth, async (req, res) => {
  try {
    const items = await Affirmation.find({ category: req.params.category });
    res.json(items);
  } catch (error) {
    console.error('Get affirmations by category error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/affirmations/:id/like
router.post('/:id/like', auth, async (req, res) => {
  try {
    const item = await Affirmation.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Affirmation not found' });
    res.json(item);
  } catch (error) {
    console.error('Like affirmation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/affirmations/:id/save
router.post('/:id/save', auth, async (req, res) => {
  try {
    const item = await Affirmation.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { savedBy: req.user._id } },
      { new: true }
    );
    if (!item) return res.status(404).json({ message: 'Affirmation not found' });
    res.json(item);
  } catch (error) {
    console.error('Save affirmation error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


