const mongoose = require('mongoose');

const AffirmationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['motivation', 'self-love', 'gratitude', 'mindfulness', 'general'],
    default: 'general'
  },
  likes: {
    type: Number,
    default: 0
  },
  savedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Affirmation', AffirmationSchema);