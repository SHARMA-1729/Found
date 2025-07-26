


// const mongoose = require('mongoose');

// const foundChildSchema = new mongoose.Schema({
//   finderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from userId to finderId
//   name: { type: String, required: true }, // Added name
//   location: { type: String, required: true },
//   photo: { 
//     type: String, 
//     required: true,
//     // match: [/^http[s]?:\/\/.+/i, 'Must be a valid URL'] // Basic URL validation
//   },
//   approximateAge: { type: Number, required: true },
//   height: { type: String }, // Added height
//   appearance: { type: String },
//   contact: { 
//     type: String, 
//     required: true,
//     match: [/^\+?[1-9]\d{1,14}$/, 'Must be a valid phone number'] // Basic phone validation
//   },
//   facialDescriptor: { type: [Number], required: true }, // Changed to [Number] for facial recognition
//   reportedByParentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional link to parent
// }, {
//   timestamps: true // Automatically manages createdAt and updatedAt
// });

// module.exports = mongoose.model('FoundChild', foundChildSchema);


const mongoose = require('mongoose');

const foundChildSchema = new mongoose.Schema({
  finderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  location: { type: String, required: true },
  photo: { type: String, required: true },
  approximateAge: { type: Number, required: true },
  height: { type: String },
  appearance: { type: String },
  contact: { type: String, required: true, match: [/^\+?[1-9]\d{1,14}$/, 'Must be a valid phone number'] },
  facialDescriptor: { type: [Number], required: true },
  reportedByParentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  isFound: { type: Boolean, default: false }, // Added isFound field
}, {
  timestamps: true
});

module.exports = mongoose.model('FoundChild', foundChildSchema);