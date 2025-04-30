const Product = require('../models/Product');

// Function to add a new product
const addProduct = async (req, res) => {
  const { type, pricePerTon, quantity } = req.body;

  try {
    const product = new Product({
      type,
      pricePerTon,
      quantity,
      sellerId: req.user.userId,
    });

    await product.save();
    res.status(201).json({ message: 'Product added successfully', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to edit an existing product
// PUT /api/products/:id/edit
const editProduct = async (req, res) => {
  const { id } = req.params;
  const { type, pricePerTon, quantity } = req.body;

  try {
    const product = await Product.findOne({ _id: id, sellerId: req.user.userId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (type) product.type = type;
    if (pricePerTon) product.pricePerTon = pricePerTon;
    if (quantity) product.quantity = quantity;

    await product.save();
    res.json({ message: 'Product updated', product });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to markProductAvailable for biding 
// PUT /api/products/:id/mark-available
const markProductAvailable = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findOne({ _id: id, sellerId: req.user.userId });
    if (!product) return res.status(404).json({ message: 'Product not found' });

    product.available = true;
    await product.save();

    res.json({ message: 'Product marked as available' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/sellers/dashboard
const getSellerDashboard = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user.userId });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Exporting the functions created above
module.exports = {
  addProduct,
  editProduct,
  markProductAvailable,
  getSellerDashboard
};
