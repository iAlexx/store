const express = require('express');
const { listProducts } = require('../controllers/productController');
const { quickOrder } = require('../controllers/orderController');

const router = express.Router();

router.get('/:storeId/products', (req, res, next) => {
  req.query.storeId = req.params.storeId;
  return listProducts(req, res, next);
});

router.post('/:storeId/checkout', (req, res, next) => {
  req.body.storeId = Number(req.params.storeId);
  return quickOrder(req, res, next);
});

module.exports = router;
