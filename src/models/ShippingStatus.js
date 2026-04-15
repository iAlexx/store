const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShippingStatus = sequelize.define('ShippingStatus', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.STRING, allowNull: false, unique: true },
  label: { type: DataTypes.STRING, allowNull: false },
  sortOrder: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, field: 'sort_order' },
}, { tableName: 'shipping_statuses', underscored: true, timestamps: true });

module.exports = ShippingStatus;
