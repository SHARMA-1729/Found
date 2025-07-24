const mongoose = require('mongoose');

const lostChildSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  skinColor: { type: String, required: true },
  height: { type: String, required: true },
  lastLocation: { type: String, required: true },
  photo: { type: String, required: true },
  details: { type: String },
  facialDescriptor: { type: Array }, // Store facial recognition data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LostChild', lostChildSchema);