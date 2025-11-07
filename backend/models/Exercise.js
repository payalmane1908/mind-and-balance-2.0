const mongoose = require('mongoose');

const ExerciseSchema = new mongoose.Schema({
  category: {
    type: String,
    enum: ['mindfulness', 'meditation', 'breathing', 'yoga', 'other'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  mediaUrl: {
    type: String,
    default: ''
  },
  completedCount: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number, // in minutes
    default: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exercise', ExerciseSchema);