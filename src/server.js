const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  // Keep startup log simple and explicit.
  console.log(`API running on port ${PORT}`);
});
