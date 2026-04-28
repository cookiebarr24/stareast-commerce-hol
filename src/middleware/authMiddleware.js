const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../services/authService");

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "missing or invalid token" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "invalid or expired token" });
  }
}

module.exports = {
  authenticate,
};
