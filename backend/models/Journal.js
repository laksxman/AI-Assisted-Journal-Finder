const mongoose = require('mongoose');

const journalSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  ambience: {
    type: String,
    enum: ['forest', 'ocean', 'mountain'],
    required: true
  },
  text: {
    type: String,
    required: true,
    maxlength: 5000
  },
  emotion: {
    type: String,
    enum: ['happy', 'sad', 'calm', 'anxious', 'excited', 'neutral'],
    default: 'neutral'
  },
  keywords: [{
    type: String,
    maxlength: 50
  }],
  summary: {
    type: String,
    maxlength: 500
  },
  createdAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, {
  timestamps: true
});

// Compound index for sorting and pagination
journalSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model('Journal', journalSchema);

