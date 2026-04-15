const productService = require('../services/productService');

async function addProduct(req, res) {
  try {
    const { storeId, name, stock = 0, isActive = true, description, imageUrl, sku, usdPrice, sypPrice } = req.body;

    if (!storeId || !name || usdPrice === undefined) {
      return res.status(400).json({ message: 'storeId, name and usdPrice are required' });
    }

    const result = await productService.addProduct({
      storeId,
      name,
      stock,
      isActive,
      description,
      imageUrl,
      sku,
      usdPrice,
      sypPrice,
    });

    return res.status(201).json(result);
  } catch (error) {
    const code = error.message === 'Store not found' ? 404 : 500;
    return res.status(code).json({ message: error.message });
  }
}

async function listProducts(req, res) {
  try {
    const storeId = Number(req.params.storeId || req.query.storeId);
    if (!storeId) {
      return res.status(400).json({ message: 'storeId is required' });
    }

    const products = await productService.listStoreProducts(storeId);
    return res.json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { addProduct, listProducts };
