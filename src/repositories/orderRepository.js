const { Order, OrderItem, Product, ProductPrice, Customer, Shipment, ShippingStatus } = require('../models');

function findOrdersByStore(storeId) {
  return Order.findAll({
    where: { storeId },
    include: [
      { model: Customer, attributes: ['id', 'fullName', 'phone', 'cityName', 'address'] },
      { model: OrderItem, include: [{ model: Product, attributes: ['id', 'name'] }] },
      {
        model: Shipment,
        include: [{ model: ShippingStatus, attributes: ['code', 'label', 'sortOrder'] }],
      },
    ],
    order: [['createdAt', 'DESC']],
  });
}

function findOrCreateCustomer(payload, transaction) {
  return Customer.findOrCreate({ where: { storeId: payload.storeId, phone: payload.phone }, defaults: payload, transaction });
}

function findProductPrice({ productId, currencyCode, storeId }, transaction) {
  return ProductPrice.findOne({ where: { productId, currencyCode, storeId }, transaction });
}

function findActiveProduct({ id, storeId }, transaction) {
  return Product.findOne({ where: { id, storeId, isActive: true }, transaction });
}

function createOrder(payload, transaction) {
  return Order.create(payload, { transaction });
}

function createOrderItems(items, transaction) {
  return OrderItem.bulkCreate(items, { transaction });
}

module.exports = {
  findOrdersByStore,
  findOrCreateCustomer,
  findProductPrice,
  findActiveProduct,
  createOrder,
  createOrderItems,
};
