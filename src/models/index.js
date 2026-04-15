const sequelize = require('../config/database');
const Merchant = require('./Merchant');
const Store = require('./Store');
const Product = require('./Product');
const ProductVariant = require('./ProductVariant');
const ProductPrice = require('./ProductPrice');
const Customer = require('./Customer');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const City = require('./City');
const ShippingProvider = require('./ShippingProvider');
const ShippingStatus = require('./ShippingStatus');
const Shipment = require('./Shipment');
const Subscription = require('./Subscription');
const AnalyticsEvent = require('./AnalyticsEvent');

Merchant.hasMany(Store, { foreignKey: 'merchant_id' });
Store.belongsTo(Merchant, { foreignKey: 'merchant_id' });

Merchant.hasMany(Subscription, { foreignKey: 'merchant_id' });
Subscription.belongsTo(Merchant, { foreignKey: 'merchant_id' });

Store.hasMany(Product, { foreignKey: 'store_id' });
Product.belongsTo(Store, { foreignKey: 'store_id' });

Product.hasMany(ProductVariant, { foreignKey: 'product_id' });
ProductVariant.belongsTo(Product, { foreignKey: 'product_id' });

Product.hasMany(ProductPrice, { foreignKey: 'product_id' });
ProductPrice.belongsTo(Product, { foreignKey: 'product_id' });

Store.hasMany(Customer, { foreignKey: 'store_id' });
Customer.belongsTo(Store, { foreignKey: 'store_id' });

Customer.hasMany(Order, { foreignKey: 'customer_id' });
Order.belongsTo(Customer, { foreignKey: 'customer_id' });
Store.hasMany(Order, { foreignKey: 'store_id' });
Order.belongsTo(Store, { foreignKey: 'store_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

Store.hasMany(ShippingProvider, { foreignKey: 'store_id' });
ShippingProvider.belongsTo(Store, { foreignKey: 'store_id' });

Store.hasMany(Shipment, { foreignKey: 'store_id' });
Shipment.belongsTo(Store, { foreignKey: 'store_id' });
Order.hasMany(Shipment, { foreignKey: 'order_id' });
Shipment.belongsTo(Order, { foreignKey: 'order_id' });
ShippingStatus.hasMany(Shipment, { foreignKey: 'shipping_status_id' });
Shipment.belongsTo(ShippingStatus, { foreignKey: 'shipping_status_id' });

Store.hasMany(AnalyticsEvent, { foreignKey: 'store_id' });
AnalyticsEvent.belongsTo(Store, { foreignKey: 'store_id' });

module.exports = {
  sequelize,
  Merchant,
  Store,
  Product,
  ProductVariant,
  ProductPrice,
  Customer,
  Order,
  OrderItem,
  City,
  ShippingProvider,
  ShippingStatus,
  Shipment,
  Subscription,
  AnalyticsEvent,
};
