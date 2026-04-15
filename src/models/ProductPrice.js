const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ProductPrice = sequelize.define('ProductPrice', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  productId: { type: DataTypes.INTEGER, allowNull: false, field: 'product_id' },
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
}, {
  tableName: 'product_prices',
  underscored: true,
  timestamps: true,
  indexes: [{ unique: true, fields: ['product_id', 'currency_code'] }],
});

module.exports = ProductPrice;
