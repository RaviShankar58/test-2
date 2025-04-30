const LorryAssignment = require('../models/LorryAssignment');
const Order = require('../models/Order');
const generateOTP = require('../utils/generateOTP');

// Function to accept a job and generate OTP
const acceptJob = async (req, res) => {
  const { orderId, lorryNumber, gps } = req.body;
  const lorryId = req.user.userId;

  try {
    const order = await Order.findById(orderId);
    if (!order || order.status !== 'pending') {
      return res.status(400).json({ message: 'Invalid or already assigned order' });
    }

    const otp = generateOTP();
    const assignment = await LorryAssignment.create({
      lorryId,
      orderId,
      lorryNumber,
      GPS: gps,
      OTP: otp,
    });

    order.status = 'shipped';
    await order.save();

    res.status(201).json({ message: 'Job accepted', assignment });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Function to verify OTP
const verifyOtp = async (req, res) => {
  const { orderId, otp } = req.body;
  const lorryId = req.user.userId;

  try {
    const assignment = await LorryAssignment.findOne({ lorryId, orderId });
    if (!assignment || assignment.OTP !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    assignment.OTP = null;
    await assignment.save();

    res.json({ message: 'OTP verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Buyer confirms delivery
const confirmDelivery = async (req, res) => {
  const { orderId } = req.body;
  const buyerId = req.user.userId;

  try {
    const order = await Order.findById(orderId);
    if (!order || order.buyerId.toString() !== buyerId) {
      return res.status(403).json({ message: 'Unauthorized or invalid order' });
    }

    order.status = 'delivered';
    await order.save();

    res.json({ message: 'Delivery confirmed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  acceptJob,
  verifyOtp,
  confirmDelivery,
};
