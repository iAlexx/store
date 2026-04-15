const { ProductPrice } = require('../models');

async function upsertDualPrices({ productId, usdPrice, exchangeRate, transaction }) {
  const usd = Number(usdPrice);
  const rate = Number(exchangeRate);

  if (!Number.isFinite(usd) || usd < 0) {
    throw new Error('Invalid USD price');
  }
  if (!Number.isFinite(rate) || rate <= 0) {
    throw new Error('Invalid exchange rate');
  }

  const sypPrice = Number((usd * rate).toFixed(2));

  await ProductPrice.upsert(
    { productId, currencyCode: 'USD', priceValue: usd },
    { transaction }
  );

  await ProductPrice.upsert(
    { productId, currencyCode: 'SYP', priceValue: sypPrice },
    { transaction }
  );

  return { USD: usd, SYP: sypPrice };
}

module.exports = { upsertDualPrices };
