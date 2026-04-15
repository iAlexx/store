const orderService = require('../services/orderService');

async function getOrders(req, res) {
  try {
    const storeId = Number(req.query.storeId || req.tenant?.storeId);
    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const orders = await orderService.listOrders(storeId);
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function quickOrder(req, res) {
  try {
    const { fullName, phone, cityName, address, storeId, items, currencyCode, paymentMethod, notes } = req.body;
    if (!fullName || !phone || !cityName || !address || !storeId || !Array.isArray(items) || !items.length) {
      return res.status(400).json({ message: 'fullName, phone, cityName, address, storeId, and items are required' });
    }

    const result = await orderService.quickOrder({
      fullName,
      phone,
      cityName,
      address,
      storeId,
      items,
      currencyCode,
      paymentMethod,
      notes,
    });

    return res.status(201).json({ message: 'Quick order created', ...result });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getOrders, quickOrder };
