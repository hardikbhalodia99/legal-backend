const { Router } = require("express");
const router = Router();

const {
	addCompanyDetails,
	updateOfficeDetailsById,
	updateDirectorDetailsById,
	updateNomineeDetailsById,
	getClientDetailsById,
} = require("./index"); // Client Controller

// Add Company Details
router.post("/", addCompanyDetails);

// Add Office Details
router.patch("/office/:id", updateOfficeDetailsById);

// Add Director Information
router.patch("/director/:id", updateDirectorDetailsById);

// Add Nominee Information
router.patch("/nominee/:id", updateNomineeDetailsById);

// Get Client Information
router.put("/:id", getClientDetailsById);

module.exports = router;