const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductVariant = sequelize.define('ProductVariant', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  productId: { type: DataTypes.BIGINT, allowNull: false, field: 'product_id' },
  name: { type: DataTypes.STRING, allowNull: false },
  sku: { type: DataTypes.STRING, allowNull: true },
  stock: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  attributes: { type: DataTypes.JSONB, allowNull: false, defaultValue: {} },
}, { tableName: 'product_variants', underscored: true, timestamps: true });

module.exports = ProductVariant;
