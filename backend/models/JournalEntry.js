const mongoose = require('mongoose');

const JournalEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  moodTag: {
    type: String,
    enum: ['happy', 'sad', 'anxious', 'calm', 'stressed', 'grateful', 'other'],
    default: 'other'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('JournalEntry', JournalEntrySchema);