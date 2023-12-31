const { Router }  = require("express")
const router = Router();
const { createPaymentOrder }  = require("./order.js")
const { getPaymentStatus }  = require("./status.js")
const { createPaymentSuccess }  = require("./success.js");
const { insertPaymentFormData } = require("./form.js");
const { verifyV1APIKey } = require("../../../../middleware/api-key-validations.js");

router.post("/create-order", verifyV1APIKey,createPaymentOrder);
router.post("/status", verifyV1APIKey,getPaymentStatus);
router.post("/success", verifyV1APIKey,createPaymentSuccess);
router.post("/form",verifyV1APIKey,insertPaymentFormData)

module.exports = router;
