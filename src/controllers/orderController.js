const {
  sequelize,
  Order,
  OrderItem,
  Product,
  ProductPrice,
  Customer,
} = require('../models');

async function getOrders(req, res) {
  try {
    const where = req.query.storeId ? { storeId: req.query.storeId } : {};
    const orders = await Order.findAll({
      where,
      include: [
        { model: Customer, attributes: ['id', 'fullName', 'phone', 'city', 'address'] },
        {
          model: OrderItem,
          include: [{ model: Product, attributes: ['id', 'name'] }],
        },
      ],
      order: [['createdAt', 'DESC']],
    });

    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

async function quickOrder(req, res) {
  const transaction = await sequelize.transaction();
  try {
    const {
      fullName,
      phone,
      city,
      address,
      storeId,
      items,
      currencyCode = 'SYP',
    } = req.body;

    if (!fullName || !phone || !city || !address || !storeId || !Array.isArray(items) || !items.length) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Customer info, storeId, and items are required' });
    }

    const [customer] = await Customer.findOrCreate({
      where: { phone },
      defaults: { fullName, phone, city, address },
      transaction,
    });

    let totalAmount = 0;
    const preparedItems = [];

    for (const item of items) {
      const product = await Product.findOne({
        where: { id: item.productId, storeId, isActive: true },
        transaction,
      });
      if (!product) {
        throw new Error(`Product ${item.productId} not found in store`);
      }

      const unitPrice = await ProductPrice.findOne({
        where: { productId: item.productId, currencyCode },
        transaction,
      });
      if (!unitPrice) {
        throw new Error(`No ${currencyCode} price for product ${item.productId}`);
      }

      const quantity = Number(item.quantity || 1);
      const linePrice = Number(unitPrice.priceValue) * quantity;
      totalAmount += linePrice;

      preparedItems.push({ productId: product.id, quantity, price: linePrice });
    }

    const order = await Order.create(
      {
        customerId: customer.id,
        storeId,
        totalAmount,
        currencyId: currencyCode,
        status: 'Pending',
      },
      { transaction }
    );

    await OrderItem.bulkCreate(
      preparedItems.map((item) => ({ ...item, orderId: order.id })),
      { transaction }
    );

    await transaction.commit();
    return res.status(201).json({ message: 'Quick order created', orderId: order.id, totalAmount, currencyCode });
  } catch (error) {
    await transaction.rollback();
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getOrders, quickOrder };
