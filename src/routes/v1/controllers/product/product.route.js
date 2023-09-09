const express = require("express");
const router = express.Router();

const { getOrganizationProductDetailsById } = require("./index");

router.get("/:organization_id/:slug",getOrganizationProductDetailsById)

module.exports = router;
