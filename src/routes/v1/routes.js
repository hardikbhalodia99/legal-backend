const express = require("express");
const router = express.Router();

const clientRoutes = require("./controllers/client/client.route");
const directorRoutes = require("./controllers/directors/director.route");
const nomineeRoutes = require("./controllers/nominees/nominee.route");
const ProductRoutes = require("./controllers/product/product.route");
const { testFunction } = require("./controllers/test");

router.use("/client", clientRoutes);
router.use("/director", directorRoutes);
router.use("/nominee", nomineeRoutes);

router.use("/product",ProductRoutes)

router.get("/test",testFunction)

module.exports = router;
