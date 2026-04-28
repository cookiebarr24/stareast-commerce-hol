const bcrypt = require("bcryptjs");

const users = [
  {
    id: 1,
    name: "Alice",
    email: "alice@example.com",
    passwordHash: bcrypt.hashSync("alice123", 10),
  },
  {
    id: 2,
    name: "Bob",
    email: "bob@example.com",
    passwordHash: bcrypt.hashSync("bob123", 10),
  },
  {
    id: 3,
    name: "Carol",
    email: "carol@example.com",
    passwordHash: bcrypt.hashSync("carol123", 10),
  },
];

const products = [
  { id: 1, name: "Notebook", price: 20.0 },
  { id: 2, name: "Mouse", price: 35.0 },
  { id: 3, name: "Keyboard", price: 70.0 },
];

module.exports = {
  users,
  products,
};
