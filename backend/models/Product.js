// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  type: { type: String, required: true },
  pricePerTon: { type: Number, required: true },
  quantity: { type: Number, required: true },
  sellerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  available: { type: Boolean, default: true },
});

module.exports = mongoose.model('Product', productSchema);
