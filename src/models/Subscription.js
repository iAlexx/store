const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription = sequelize.define('Subscription', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  merchantId: { type: DataTypes.BIGINT, allowNull: false, field: 'merchant_id' },
  planCode: { type: DataTypes.ENUM('starter', 'pro', 'advanced'), allowNull: false, field: 'plan_code' },
  monthlyPriceUsd: { type: DataTypes.DECIMAL(10, 2), allowNull: false, field: 'monthly_price_usd' },
  status: { type: DataTypes.ENUM('active', 'past_due', 'cancelled'), allowNull: false },
  startedAt: { type: DataTypes.DATE, allowNull: false, field: 'started_at' },
  expiresAt: { type: DataTypes.DATE, allowNull: true, field: 'expires_at' },
}, { tableName: 'subscriptions', underscored: true, timestamps: true });

module.exports = Subscription;
