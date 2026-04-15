const express = require('express');
const { addProduct, listProducts } = require('../controllers/productController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
router.post('/add', requireAuth, requireRole('merchant', 'super_admin'), addProduct);
router.get('/store/:storeId', listProducts);

module.exports = router;
