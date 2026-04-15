const express = require('express');
const { getOrders, quickOrder } = require('../controllers/orderController');
const { requireAuth, requireRole } = require('../middleware/auth');
const { requireTenantContext } = require('../middleware/tenant');

const router = express.Router();
router.get('/', requireAuth, requireRole('merchant', 'super_admin'), requireTenantContext, getOrders);
router.post('/quick-order', quickOrder);

module.exports = router;
