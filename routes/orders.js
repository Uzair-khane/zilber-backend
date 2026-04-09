const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createOrder,
  getAllOrders,
  updateOrderStatus,
  deleteOrder
} = require('../controllers/orderController');

// Public — customer order place kare
router.post('/', createOrder);

// Admin only
router.get('/', auth, getAllOrders);
router.put('/:id/status', auth, updateOrderStatus);
router.delete('/:id', auth, deleteOrder);

module.exports = router;