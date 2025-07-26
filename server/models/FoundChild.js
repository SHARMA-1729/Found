// const mongoose = require('mongoose');

// const foundChildSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   location: { type: String, required: true },
//   photo: { type: String, required: true },
//   approximateAge: { type: Number, required: true },
//   appearance: { type: String },
//   contact: { type: String, required: true },
//   facialDescriptor: { type: Array }, // Store facial recognition data
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('FoundChild', foundChildSchema);


const mongoose = require('mongoose');

const foundChildSchema = new mongoose.Schema({
  finderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from userId to finderId
  name: { type: String, required: true }, // Added name
  location: { type: String, required: true },
  photo: { 
    type: String, 
    required: true,
    // match: [/^http[s]?:\/\/.+/i, 'Must be a valid URL'] // Basic URL validation
  },
  approximateAge: { type: Number, required: true },
  height: { type: String }, // Added height
  appearance: { type: String },
  contact: { 
    type: String, 
    required: true,
    match: [/^\+?[1-9]\d{1,14}$/, 'Must be a valid phone number'] // Basic phone validation
  },
  facialDescriptor: { type: [Number], required: true }, // Changed to [Number] for facial recognition
  reportedByParentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional link to parent
}, {
  timestamps: true // Automatically manages createdAt and updatedAt
});

module.exports = mongoose.model('FoundChild', foundChildSchema);