const checkoutService = require("../services/checkoutService");

function checkout(req, res) {
  try {
    const result = checkoutService.checkout({
      ...req.body,
      user: req.user,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

module.exports = {
  checkout,
};
