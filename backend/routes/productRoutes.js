// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const {
  addProduct,
  editProduct,
  markProductAvailable,
  getSellerDashboard
} = require('../controllers/productController');
const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// All routes are protected and seller-only
router.post('/add', authenticateUser, authorizeRoles('seller'), addProduct);
router.put('/:id/edit', authenticateUser, authorizeRoles('seller'), editProduct);
router.put('/:id/mark-available', authenticateUser, authorizeRoles('seller'), markProductAvailable);
router.get('/dashboard', authenticateUser, authorizeRoles('seller'), getSellerDashboard);

module.exports = router;
