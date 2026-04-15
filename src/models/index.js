const sequelize = require('../config/database');
const Merchant = require('./Merchant');
const Store = require('./Store');
const Product = require('./Product');
const ProductPrice = require('./ProductPrice');
const Customer = require('./Customer');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const City = require('./City');

Merchant.hasMany(Store, { foreignKey: 'merchant_id' });
Store.belongsTo(Merchant, { foreignKey: 'merchant_id' });

Store.hasMany(Product, { foreignKey: 'store_id' });
Product.belongsTo(Store, { foreignKey: 'store_id' });

Product.hasMany(ProductPrice, { foreignKey: 'product_id' });
ProductPrice.belongsTo(Product, { foreignKey: 'product_id' });

Customer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Store.hasMany(Order, { foreignKey: 'store_id' });
Order.belongsTo(Store, { foreignKey: 'store_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  sequelize,
  Merchant,
  Store,
  Product,
  ProductPrice,
  Customer,
  Order,
  OrderItem,
  City,
};
