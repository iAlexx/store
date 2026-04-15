const { Product, Store, sequelize } = require('../models');
const { upsertDualPrices } = require('../middleware/priceSync');

async function addProduct(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const { storeId, name, stock = 0, isActive = true, usdPrice } = req.body;
    if (!storeId || !name || usdPrice === undefined) {
      await transaction.rollback();
      return res.status(400).json({ message: 'storeId, name and usdPrice are required' });
    }

    const store = await Store.findByPk(storeId, { transaction });
    if (!store) {
      await transaction.rollback();
      return res.status(404).json({ message: 'Store not found' });
    }

    const product = await Product.create({ storeId, name, stock, isActive }, { transaction });
    const pricing = await upsertDualPrices({
      productId: product.id,
      usdPrice,
      exchangeRate: store.exchangeRate,
      transaction,
    });

    await transaction.commit();
    return res.status(201).json({ product, pricing });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { addProduct };
