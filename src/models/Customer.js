const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Customer = sequelize.define('Customer', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  fullName: { type: DataTypes.STRING, allowNull: false, field: 'full_name' },
  phone: { type: DataTypes.STRING, allowNull: false },
  cityId: { type: DataTypes.BIGINT, allowNull: true, field: 'city_id' },
  cityName: { type: DataTypes.STRING, allowNull: true, field: 'city_name' },
  address: { type: DataTypes.STRING, allowNull: false },
}, { tableName: 'customers', underscored: true, timestamps: true });

module.exports = Customer;
