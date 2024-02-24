const { Router } = require("express");
const { getFormDetails } = require("./index");
const router = Router();
const { addCompanyDetails,addOfficeDetails, uploadDocuments } = require("./company"); // Client Controller
const {updateNomineeDetailsById} = require("./nominees");
const { updateDirectorDetailsById } = require("./directors"); 

router.get("/:productSlug/:clientId",getFormDetails)
router.put("/company", addCompanyDetails);
router.put("/office",addOfficeDetails);
router.post("/documents",uploadDocuments)
router.put("/director", updateDirectorDetailsById);
router.put("/nominee",updateNomineeDetailsById);


module.exports = router;
