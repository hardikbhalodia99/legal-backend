const { Router } = require("express");
const { getFormDetails } = require("./index");
const router = Router();

router.get("/:productSlug/:clientId",getFormDetails)

module.exports = router;
