const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Store = sequelize.define('Store', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  merchantId: { type: DataTypes.BIGINT, allowNull: false, field: 'merchant_id' },
  name: { type: DataTypes.STRING, allowNull: false },
  slug: { type: DataTypes.STRING, allowNull: false, unique: true },
  city: { type: DataTypes.STRING, allowNull: false },
  defaultCurrency: {
    type: DataTypes.ENUM('USD', 'SYP'),
    field: 'default_currency',
    defaultValue: 'SYP',
  },
  exchangeRate: {
    type: DataTypes.DECIMAL(16, 2),
    allowNull: false,
    defaultValue: 15000,
    field: 'exchange_rate',
    validate: { min: 1 },
  },
  themeConfig: { type: DataTypes.JSONB, allowNull: false, defaultValue: {}, field: 'theme_config' },
  telegramChatId: { type: DataTypes.STRING, allowNull: true, field: 'telegram_chat_id' },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, field: 'is_active' },
}, { tableName: 'stores', underscored: true, timestamps: true });

module.exports = Store;
