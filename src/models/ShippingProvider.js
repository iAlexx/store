const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ShippingProvider = sequelize.define('ShippingProvider', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  name: { type: DataTypes.STRING, allowNull: false },
  phone: { type: DataTypes.STRING, allowNull: true },
  baseCost: { type: DataTypes.DECIMAL(16, 2), allowNull: false, field: 'base_cost', defaultValue: 0 },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
}, { tableName: 'shipping_providers', underscored: true, timestamps: true });

module.exports = ShippingProvider;
