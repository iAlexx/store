const { Store } = require('../models');

async function createStore(req, res) {
  try {
    const { merchantId, name, city, exchangeRate } = req.body;
    const store = await Store.create({ merchantId, name, city, exchangeRate });
    return res.status(201).json(store);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function getMerchantStores(req, res) {
  try {
    const stores = await Store.findAll({ where: { merchantId: req.params.merchantId } });
    return res.json(stores);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { createStore, getMerchantStores };
