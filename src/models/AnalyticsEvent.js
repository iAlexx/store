const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const AnalyticsEvent = sequelize.define('AnalyticsEvent', {
  id: { type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true },
  storeId: { type: DataTypes.BIGINT, allowNull: false, field: 'store_id' },
  eventType: { type: DataTypes.STRING, allowNull: false, field: 'event_type' },
  eventPayload: { type: DataTypes.JSONB, allowNull: false, defaultValue: {}, field: 'event_payload' },
  source: { type: DataTypes.STRING, allowNull: false, defaultValue: 'storefront' },
}, { tableName: 'analytics_events', underscored: true, timestamps: false, createdAt: 'created_at', updatedAt: false });

module.exports = AnalyticsEvent;
