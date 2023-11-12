const { Router } = require("express")
const router = Router();

const clientRoutes = require("./controllers/client/client.route.js")
const directorRoutes = require("./controllers/directors/director.route.js")
const nomineeRoutes = require("./controllers/nominees/nominee.route.js")
const ProductRoutes = require("./controllers/product/product.route.js")
const { testFunction } = require("./controllers/test.js")
const PaymentRoutes = require("./controllers/payment/payment.routes.js")

router.use("/client", clientRoutes);
router.use("/director", directorRoutes);
router.use("/nominee", nomineeRoutes);

router.use("/product",ProductRoutes)

router.get("/test",testFunction)

router.use("/payment",PaymentRoutes)

module.exports = router