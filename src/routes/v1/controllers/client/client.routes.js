const express = require("express")
const { getClientFormDetails } = require("./index")
const router = express.Router()

router.get("/form-details",getClientFormDetails)

module.exports = router