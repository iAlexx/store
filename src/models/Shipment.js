const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Shipment = sequelize.define('Shipment', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  orderId: { type: DataTypes.BIGINT, allowNull: false, field: 'order_id' },
  shippingProviderId: { type: DataTypes.BIGINT, allowNull: true, field: 'shipping_provider_id' },
  shippingStatusId: { type: DataTypes.BIGINT, allowNull: true, field: 'shipping_status_id' },
  trackingNumber: { type: DataTypes.STRING, allowNull: true, field: 'tracking_number' },
  shippedAt: { type: DataTypes.DATE, allowNull: true, field: 'shipped_at' },
  deliveredAt: { type: DataTypes.DATE, allowNull: true, field: 'delivered_at' },
}, { tableName: 'shipments', underscored: true, timestamps: true });

module.exports = Shipment;
