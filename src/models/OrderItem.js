const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  orderId: { type: DataTypes.BIGINT, allowNull: false, field: 'order_id' },
  productId: { type: DataTypes.BIGINT, allowNull: false, field: 'product_id' },
  variantId: { type: DataTypes.BIGINT, allowNull: true, field: 'variant_id' },
  productName: { type: DataTypes.STRING, allowNull: false, field: 'product_name' },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  unitPrice: { type: DataTypes.DECIMAL(16, 2), allowNull: false, field: 'unit_price' },
  lineTotal: { type: DataTypes.DECIMAL(16, 2), allowNull: false, field: 'line_total' },
}, { tableName: 'order_items', underscored: true, timestamps: true });

module.exports = OrderItem;
