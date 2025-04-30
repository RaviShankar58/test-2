const Product = require('../models/Product');
const Bid = require('../models/Bid');
const Order = require('../models/Order');

const searchProducts = async (req, res) => {
  const { type, qty } = req.query;

  try {
    const products = await Product.find({
      type: new RegExp(type, 'i'),
      quantity: { $gte: qty },
      available: true,
    });

    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


const placeBid = async (req, res) => {
  const { productId, bidPrice } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product || !product.available) {
      return res.status(404).json({ message: 'Product not available' });
    }

    const bid = new Bid({
      productId,
      buyerId: req.user.userId,
      bidPrice,
      status: 'pending',
    });

    // code to auto accept the bid
    if (bidPrice >= product.pricePerTon) {
      bid.status = 'accepted';

      // After accepting bid create order by default
      const order = new Order({
        buyerId: req.user.userId,
        sellerId: product.sellerId,
        productId: product._id,
        price: bidPrice,
        status: 'created',
      });

      await order.save();
      console.log(`Bid is accepted and order created for buyer ${req.user.userId}`);
    }

    await bid.save();
    res.status(201).json({ message: 'Bid placed', bid });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/buyers/orders
// Function to get all orders for a buyer 
const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyerId: req.user.userId }).populate('productId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Exporting the functions created above to be used in routes
module.exports = {
  searchProducts,
  placeBid,
  getBuyerOrders,
};
