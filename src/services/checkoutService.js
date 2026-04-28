const { products } = require("../models/dataStore");

const PAYMENT_METHODS = {
  CASH: "cash",
  CREDIT_CARD: "credit_card",
};

function checkout({ items, paymentMethod, user }) {
  if (!user) {
    throw new Error("authenticated user is required");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("items must be a non-empty array");
  }

  if (
    paymentMethod !== PAYMENT_METHODS.CASH &&
    paymentMethod !== PAYMENT_METHODS.CREDIT_CARD
  ) {
    throw new Error("paymentMethod must be cash or credit_card");
  }

  const detailedItems = items.map((item) => {
    const product = products.find((productItem) => productItem.id === item.productId);
    if (!product) {
      throw new Error(`product ${item.productId} not found`);
    }

    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new Error(`invalid quantity for product ${item.productId}`);
    }

    return {
      productId: product.id,
      name: product.name,
      quantity: item.quantity,
      unitPrice: product.price,
      total: product.price * item.quantity,
    };
  });

  const subtotal = detailedItems.reduce((sum, item) => sum + item.total, 0);
  const discount = paymentMethod === PAYMENT_METHODS.CASH ? subtotal * 0.1 : 0;
  const total = subtotal - discount;

  return {
    customer: {
      id: user.userId,
      email: user.email,
    },
    paymentMethod,
    items: detailedItems,
    subtotal,
    discount,
    total,
  };
}

module.exports = {
  checkout,
};
