const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },

  campaign: {
    type: String,
    required: true
  },

  ngo: {
    type: String,
    required: true
  },

  acct: {
    type: String
  },

  hash: {
    type: String
  },

  amount: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    default: 'Pending'
  },

  usedFor: {
    type: String,
    default: ''
  },

  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Donation', donationSchema);