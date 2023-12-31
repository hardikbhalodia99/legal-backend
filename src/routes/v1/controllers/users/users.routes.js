const { Router } = require("express");
const router = Router();

const ClientRoutes = require("../client/client.routes");

const CompanyRoutes = require("../forms/company/company.routes.js");
const DirectorRoutes = require("../forms/directors/director.routes.js");
const NomineeRoutes = require("../forms/nominees/nominee.routes.js");
const ProductRoutes = require("../product/product.route.js");
const { testFunction } = require("../test.js");
const PaymentRoutes = require("../payment/payment.routes.js");

router.use("/client",ClientRoutes)
router.use("/company", CompanyRoutes);
router.use("/director", DirectorRoutes);
router.use("/nominee", NomineeRoutes);

router.use("/product", ProductRoutes);

router.get("/test", testFunction);

router.use("/payment", PaymentRoutes);

module.exports = router;
