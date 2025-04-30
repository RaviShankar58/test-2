const express = require('express');
const router = express.Router();
const {
  acceptJob,
  verifyOtp,
  confirmDelivery,
} = require('../controllers/lorryController');

const authenticateUser = require('../middleware/authMiddleware');
const authorizeRoles = require('../middleware/roleMiddleware');

// Lorry routes
router.post('/accept-job', authenticateUser, authorizeRoles('lorry'), acceptJob);
router.post('/verify-otp', authenticateUser, authorizeRoles('lorry'), verifyOtp);

// Buyer confirms delivery
router.post('/buyer/confirm-delivery', authenticateUser, authorizeRoles('buyer'), confirmDelivery);

module.exports = router;
