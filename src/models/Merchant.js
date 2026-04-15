const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Merchant = sequelize.define('Merchant', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  fullName: { type: DataTypes.STRING, allowNull: false, field: 'full_name' },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING, allowNull: false, unique: true },
  role: {
    type: DataTypes.ENUM('super_admin', 'merchant'),
    allowNull: false,
    defaultValue: 'merchant',
  },
  passwordHash: { type: DataTypes.STRING, allowNull: false, field: 'password_hash' },
  referralCode: { type: DataTypes.STRING, allowNull: true, unique: true, field: 'referral_code' },
  referredByMerchantId: { type: DataTypes.BIGINT, allowNull: true, field: 'referred_by_merchant_id' },
}, { tableName: 'merchants', underscored: true, timestamps: true });

module.exports = Merchant;
