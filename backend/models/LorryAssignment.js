// models/LorryAssignment.js
const mongoose = require('mongoose');

const lorryAssignmentSchema = new mongoose.Schema({
  lorryId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  lorryNumber: { type: String, required: true },
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: [Number], // [longitude, latitude]
  },
  otp: { type: String, required: true }
});

lorryAssignmentSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('LorryAssignment', lorryAssignmentSchema);
