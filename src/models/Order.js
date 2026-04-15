const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  customerId: { type: DataTypes.INTEGER, allowNull: false, field: 'customer_id' },
  storeId: { type: DataTypes.INTEGER, allowNull: false, field: 'store_id' },
  totalAmount: { type: DataTypes.DECIMAL(16, 2), allowNull: false, field: 'total_amount' },
  currencyId: {
    type: DataTypes.ENUM('USD', 'SYP'),
    allowNull: false,
    field: 'currency_id',
    defaultValue: 'SYP',
  },
  status: {
    type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered'),
    allowNull: false,
    defaultValue: 'Pending',
  },
}, { tableName: 'orders', underscored: true, timestamps: true });

module.exports = Order;
