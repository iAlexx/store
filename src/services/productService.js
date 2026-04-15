const { sequelize } = require('../models');
const productRepo = require('../repositories/productRepository');

async function syncUsdSypPrice({ storeId, productId, usdPrice, exchangeRate, manualSypPrice }, transaction) {
  const usd = Number(usdPrice);
  const autoSyp = Number((usd * Number(exchangeRate)).toFixed(2));
  const syp = manualSypPrice !== undefined ? Number(manualSypPrice) : autoSyp;

  await productRepo.upsertPrice({ storeId, productId, currencyCode: 'USD', priceValue: usd }, transaction);
  await productRepo.upsertPrice(
    {
      storeId,
      productId,
      currencyCode: 'SYP',
      priceValue: syp,
      isManualOverride: manualSypPrice !== undefined,
    },
    transaction
  );

  return { USD: usd, SYP: syp, autoSyp, manualOverride: manualSypPrice !== undefined };
}

async function addProduct({ storeId, name, stock = 0, isActive = true, description, imageUrl, sku, usdPrice, sypPrice }) {
  return sequelize.transaction(async (transaction) => {
    const store = await productRepo.getStoreById(storeId, transaction);
    if (!store) {
      throw new Error('Store not found');
    }

    const product = await productRepo.createProduct({
      storeId,
      name,
      stock,
      isActive,
      description,
      imageUrl,
      sku,
    }, transaction);

    const pricing = await syncUsdSypPrice({
      storeId,
      productId: product.id,
      usdPrice,
      exchangeRate: store.exchangeRate,
      manualSypPrice: sypPrice,
    }, transaction);

    return { product, pricing };
  });
}

function listStoreProducts(storeId) {
  return productRepo.findStoreProducts(storeId);
}

module.exports = { addProduct, listStoreProducts };
