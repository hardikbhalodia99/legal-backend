const { Router } = require("express")
const router = Router();

const { getOrganizationProductDetailsById } = require("./index.js")

router.get("/:organization_id/:slug",getOrganizationProductDetailsById)

module.exports = router