const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductPrice = sequelize.define('ProductPrice', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  productId: { type: DataTypes.BIGINT, allowNull: false, field: 'product_id' },
  variantId: { type: DataTypes.BIGINT, allowNull: true, field: 'variant_id' },
  currencyCode: {
    type: DataTypes.ENUM('USD', 'SYP'),
    allowNull: false,
    field: 'currency_code',
  },
  priceValue: {
    type: DataTypes.DECIMAL(16, 2),
    allowNull: false,
    field: 'price_value',
    validate: { min: 0 },
  },
  isManualOverride: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    field: 'is_manual_override',
  },
}, {
  tableName: 'product_prices',
  underscored: true,
  timestamps: true,
});

module.exports = ProductPrice;
