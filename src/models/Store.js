const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  merchantId: { type: DataTypes.INTEGER, allowNull: false, field: 'merchant_id' },
  name: { type: DataTypes.STRING, allowNull: false },
  city: { type: DataTypes.STRING, allowNull: false },
  exchangeRate: {
    type: DataTypes.DECIMAL(16, 2),
    allowNull: false,
    defaultValue: 15000,
    field: 'exchange_rate',
    validate: { min: 1 },
  },
}, { tableName: 'stores', underscored: true, timestamps: true });

module.exports = Store;
