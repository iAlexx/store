const express = require('express');
const { createStore, getMerchantStores } = require('../controllers/storeController');

const router = express.Router();
router.post('/', createStore);
router.get('/merchant/:merchantId', getMerchantStores);

module.exports = router;
