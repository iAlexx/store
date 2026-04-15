const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  customerId: { type: DataTypes.BIGINT, allowNull: false, field: 'customer_id' },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  paymentMethod: {
    type: DataTypes.ENUM('COD', 'ONLINE'),
    allowNull: false,
    defaultValue: 'COD',
    field: 'payment_method',
  },
  totalAmount: { type: DataTypes.DECIMAL(16, 2), allowNull: false, field: 'total_amount' },
  currencyCode: {
    type: DataTypes.ENUM('USD', 'SYP'),
    allowNull: false,
    field: 'currency_code',
    defaultValue: 'SYP',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Rejected'),
    allowNull: false,
    defaultValue: 'Pending',
  },
  notes: { type: DataTypes.TEXT, allowNull: true },
}, { tableName: 'orders', underscored: true, timestamps: true });

module.exports = Order;
