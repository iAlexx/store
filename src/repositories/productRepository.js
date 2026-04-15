const { Product, ProductPrice, Store } = require('../models');

function getStoreById(storeId, transaction) {
  return Store.findByPk(storeId, { transaction });
}

function createProduct(payload, transaction) {
  return Product.create(payload, { transaction });
}

function upsertPrice(payload, transaction) {
  return ProductPrice.upsert(payload, { transaction });
}

function findStoreProducts(storeId) {
  return Product.findAll({
    where: { storeId, isActive: true },
    include: [{ model: ProductPrice, attributes: ['currencyCode', 'priceValue'] }],
    order: [['createdAt', 'DESC']],
  });
}

module.exports = { getStoreById, createProduct, upsertPrice, findStoreProducts };
