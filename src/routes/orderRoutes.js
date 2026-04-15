const express = require('express');
const { getOrders, quickOrder } = require('../controllers/orderController');

const router = express.Router();
router.get('/', getOrders);
router.post('/quick-order', quickOrder);

module.exports = router;
