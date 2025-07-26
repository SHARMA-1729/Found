// const mongoose = require('mongoose');

// const lostChildSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   name: { type: String, required: true },
//   age: { type: Number, required: true },
//   skinColor: { type: String, required: true },
//   height: { type: String, required: true },
//   lastLocation: { type: String, required: true },
//   photo: { type: String, required: true },
//   details: { type: String },
//   facialDescriptor: { type: Array }, // Store facial recognition data
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('LostChild', lostChildSchema);


const mongoose = require('mongoose');

const lostChildSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Parent ka ID
  name: { type: String, required: true },
  age: { type: Number, required: true },
  skinColor: { type: String },
  height: { type: String },
  lastLocation: { type: String, required: true },
  photo: { type: String, required: true },
  details: { type: String },
  facialDescriptor: { type: [Number], required: true },
  isFound: { type: Boolean, default: false },
  finder: {
    finderId: { type: String }, // Finder ka ID
    name: { type: String },
    phone: { type: String }
  },
  submittedByFinder: { type: Boolean, default: false } // Finder submission marker
}, { timestamps: true });

module.exports = mongoose.model('LostChild', lostChildSchema);