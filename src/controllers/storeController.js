const { Store } = require('../models');

async function createStore(req, res) {
  try {
    const { merchantId, name, slug, city, exchangeRate } = req.body;
    if (!merchantId || !name || !slug || !city || !exchangeRate) {
      return res.status(400).json({ message: 'merchantId, name, slug, city, and exchangeRate are required' });
    }

    const store = await Store.create({ merchantId, name, slug, city, exchangeRate });
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
