const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const healthRoutes = require("./routes/healthRoutes");

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, "../swagger/swagger.yaml"));

app.use(express.json());

app.use("/", healthRoutes);
app.use("/", authRoutes);
app.use("/", checkoutRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
