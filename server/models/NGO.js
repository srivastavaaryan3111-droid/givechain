const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name:     String,
  email:    { type: String, unique: true },
  password: String,
  org:      String,
  verified: { type: Boolean, default: false },
  createdAt:{ type: Date, default: Date.now },
});

module.exports = mongoose.model('NGO', ngoSchema);