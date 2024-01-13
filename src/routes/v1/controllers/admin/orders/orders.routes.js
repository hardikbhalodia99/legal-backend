const { Router } = require("express");
const { getClientOrders } = require("./index");
const router = Router();

router.get("/:productSlug",getClientOrders)

module.exports = router;
