// routes/buyerRoutes.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const { searchProducts, placeBid, getBuyerOrders } = require('../controllers/buyerController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Register/Login (reuse)
router.post('/register', (req, res) => registerUser(req, res));
router.post('/login', (req, res) => loginUser(req, res));

// Buyer-only protected routes
router.get('/products/search', authenticateUser, authorizeRoles('buyer'), searchProducts);
router.post('/bids', authenticateUser, authorizeRoles('buyer'), placeBid);
router.get('/orders', authenticateUser, authorizeRoles('buyer'), getBuyerOrders);

module.exports = router;
