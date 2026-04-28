const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { users } = require("../models/dataStore");

const JWT_SECRET = process.env.JWT_SECRET || "simple-secret-key";

function register({ name, email, password }) {
  if (!name || !email || !password) {
    throw new Error("name, email and password are required");
  }

  const emailInUse = users.some((user) => user.email === email);
  if (emailInUse) {
    throw new Error("email already registered");
  }

  const newUser = {
    id: users.length + 1,
    name,
    email,
    passwordHash: bcrypt.hashSync(password, 10),
  };

  users.push(newUser);

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
}

function login({ email, password }) {
  if (!email || !password) {
    throw new Error("email and password are required");
  }

  const user = users.find((item) => item.email === email);
  if (!user) {
    throw new Error("invalid credentials");
  }

  const isValidPassword = bcrypt.compareSync(password, user.passwordHash);
  if (!isValidPassword) {
    throw new Error("invalid credentials");
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return { token };
}

module.exports = {
  register,
  login,
  JWT_SECRET,
};
