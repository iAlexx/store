const bcrypt = require('bcryptjs');
const { Merchant } = require('../models');

async function register(req, res) {
  try {
    const { fullName, email, phone, password } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: 'fullName, email, phone, password are required' });
    }

    const existing = await Merchant.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: 'Merchant already exists' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const merchant = await Merchant.create({ fullName, email, phone, passwordHash });

    return res.status(201).json({
      message: 'Merchant registered successfully',
      merchant: {
        id: merchant.id,
        fullName: merchant.fullName,
        email: merchant.email,
        phone: merchant.phone,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { register };
