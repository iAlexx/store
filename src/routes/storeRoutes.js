const express = require('express');
const { createStore, getMerchantStores } = require('../controllers/storeController');
const { requireAuth, requireRole } = require('../middleware/auth');

const router = express.Router();
router.post('/', requireAuth, requireRole('merchant', 'super_admin'), createStore);
router.get('/merchant/:merchantId', requireAuth, requireRole('merchant', 'super_admin'), getMerchantStores);

module.exports = router;
