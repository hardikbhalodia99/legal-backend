const { Router }  = require("express")
const router = Router();
const { createPaymentOrder }  = require("./order.js")
const { getPaymentStatus }  = require("./status.js")
const { createPaymentSuccess }  = require("./success.js")

router.post("/create-order", createPaymentOrder);
router.post("/status", getPaymentStatus);
router.post("/success", createPaymentSuccess);

module.exports = router;
