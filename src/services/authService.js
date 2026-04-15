const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../models');
const merchantRepo = require('../repositories/merchantRepository');

function slugify(input) {
  return String(input).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

async function registerMerchant({ fullName, email, phone, password, city = 'Damascus' }) {
  const exists = await merchantRepo.findByEmail(email);
  if (exists) {
    throw new Error('Merchant already exists');
  }

  return sequelize.transaction(async (transaction) => {
    const passwordHash = await bcrypt.hash(password, 10);
    const referralCode = `REF-${Date.now().toString(36).toUpperCase()}`;

    const merchant = await merchantRepo.createMerchant({
      fullName,
      email,
      phone,
      passwordHash,
      role: 'merchant',
      referralCode,
    }, transaction);

    const store = await merchantRepo.createDefaultStore({
      merchantId: merchant.id,
      name: `${fullName.split(' ')[0]}'s Store`,
      slug: `${slugify(fullName)}-${merchant.id}`,
      city,
      exchangeRate: 15000,
      defaultCurrency: 'SYP',
    }, transaction);

    await merchantRepo.createDefaultSubscription({
      merchantId: merchant.id,
      planCode: 'starter',
      monthlyPriceUsd: 5,
      status: 'active',
      startedAt: new Date(),
    }, transaction);

    const token = jwt.sign(
      { merchantId: merchant.id, role: merchant.role, defaultStoreId: store.id },
      process.env.JWT_SECRET || 'dev-secret',
      { expiresIn: '7d' }
    );

    return { merchant, store, token };
  });
}

module.exports = { registerMerchant };
