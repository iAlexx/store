const { sequelize } = require('../models');
const orderRepo = require('../repositories/orderRepository');

function listOrders(storeId) {
  return orderRepo.findOrdersByStore(storeId);
}

async function quickOrder(payload) {
  const { fullName, phone, cityName, address, storeId, items, currencyCode = 'SYP', paymentMethod = 'COD', notes } = payload;

  return sequelize.transaction(async (transaction) => {
    const [customer] = await orderRepo.findOrCreateCustomer(
      { storeId, fullName, phone, cityName, address },
      transaction
    );

    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const quantity = Number(item.quantity || 1);
      const product = await orderRepo.findActiveProduct({ id: item.productId, storeId }, transaction);
      if (!product) {
        throw new Error(`Product ${item.productId} not found in store`);
      }

      const unitPriceRow = await orderRepo.findProductPrice({
        productId: product.id,
        currencyCode,
        storeId,
      }, transaction);
      if (!unitPriceRow) {
        throw new Error(`No ${currencyCode} price for product ${product.id}`);
      }

      const unitPrice = Number(unitPriceRow.priceValue);
      const lineTotal = Number((unitPrice * quantity).toFixed(2));
      totalAmount += lineTotal;

      preparedItems.push({
        storeId,
        productId: product.id,
        variantId: item.variantId || null,
        productName: product.name,
        quantity,
        unitPrice,
        lineTotal,
      });
    }

    const order = await orderRepo.createOrder(
      {
        storeId,
        customerId: customer.id,
        paymentMethod,
        totalAmount,
        currencyCode,
        status: 'Pending',
        notes: notes || null,
      },
      transaction
    );

    await orderRepo.createOrderItems(preparedItems.map((item) => ({ ...item, orderId: order.id })), transaction);

    return { orderId: order.id, totalAmount, currencyCode, paymentMethod };
  });
}

module.exports = { listOrders, quickOrder };
