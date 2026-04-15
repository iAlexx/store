const { Merchant, Store, Subscription } = require('../models');

async function findByEmail(email) {
  return Merchant.findOne({ where: { email } });
}

async function createMerchant(payload, transaction) {
  return Merchant.create(payload, { transaction });
}

async function createDefaultStore(payload, transaction) {
  return Store.create(payload, { transaction });
}

async function createDefaultSubscription(payload, transaction) {
  return Subscription.create(payload, { transaction });
}

module.exports = { findByEmail, createMerchant, createDefaultStore, createDefaultSubscription };
