const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

// GET /api/journal - Fetch journal entries
router.get('/', auth, async (req, res) => {
  try {
    const entries = await JournalEntry.find({ user: req.user._id }).sort({ timestamp: -1 });
    res.json(entries);
  } catch (error) {
    console.error('Get journal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/journal - Add new journal entry
router.post('/', auth, async (req, res) => {
  try {
    const { content, moodTag } = req.body;
    if (!content) {
      return res.status(400).json({ message: 'Content is required' });
    }
    const entry = await JournalEntry.create({
      user: req.user._id,
      content,
      moodTag: moodTag || 'other'
    });
    res.status(201).json(entry);
  } catch (error) {
    console.error('Create journal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/journal/:id - Get single entry
router.get('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({ _id: req.params.id, user: req.user._id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Get journal by id error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /api/journal/:id - Update entry
router.put('/:id', auth, async (req, res) => {
  try {
    const { content, moodTag } = req.body;
    const entry = await JournalEntry.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { content, moodTag },
      { new: true }
    );
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json(entry);
  } catch (error) {
    console.error('Update journal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE /api/journal/:id - Delete entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!entry) return res.status(404).json({ message: 'Entry not found' });
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    console.error('Delete journal error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;


