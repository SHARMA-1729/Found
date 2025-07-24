const mongoose = require('mongoose');

const foundChildSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  approximateAge: { type: Number, required: true },
  appearance: { type: String },
  contact: { type: String, required: true },
  facialDescriptor: { type: Array }, // Store facial recognition data
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FoundChild', foundChildSchema);