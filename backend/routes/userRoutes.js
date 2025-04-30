const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Public routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Seller-only route example
router.post('/products/add', authenticateUser, authorizeRoles('seller'), (req, res) => {
  res.send('Product added');
});

// Buyer-only route example
router.post('/bids', authenticateUser, authorizeRoles('buyer'), (req, res) => {
  res.send('Bid placed');
});


module.exports = router;
