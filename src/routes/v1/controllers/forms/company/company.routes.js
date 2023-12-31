const { Router } = require("express");
const router = Router();

const { addCompanyDetails,addOfficeDetails, uploadDocuments } = require("./index"); // Client Controller

// Add Company Details
router.put("/company", addCompanyDetails);
router.put("/office",addOfficeDetails);
router.post("/documents",uploadDocuments)

module.exports = router;
