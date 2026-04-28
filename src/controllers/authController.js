const authService = require("../services/authService");

function register(req, res) {
  try {
    const user = authService.register(req.body);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

function login(req, res) {
  try {
    const result = authService.login(req.body);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = {
  register,
  login,
};
