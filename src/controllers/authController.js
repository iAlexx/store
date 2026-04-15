const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { fullName, email, phone, password, city } = req.body;

    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({ message: 'fullName, email, phone, password are required' });
    }

    const result = await authService.registerMerchant({ fullName, email, phone, password, city });
    return res.status(201).json({
      message: 'Merchant registered and store auto-created',
      token: result.token,
      merchant: {
        id: result.merchant.id,
        fullName: result.merchant.fullName,
        email: result.merchant.email,
        role: result.merchant.role,
      },
      store: {
        id: result.store.id,
        name: result.store.name,
        slug: result.store.slug,
        exchangeRate: result.store.exchangeRate,
      },
    });
  } catch (error) {
    const code = error.message === 'Merchant already exists' ? 409 : 500;
    return res.status(code).json({ message: error.message });
  }
}

module.exports = { register };
