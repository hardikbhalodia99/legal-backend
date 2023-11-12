const { Router } = require("express");
const router = Router();

const {
	addNominee,
	updateDocumentLinkById,
	updateNomineeDetailsById,
	getNomineeDetailsById,
} = require("./nominee.controller.js"); // Nominee Controller

// Add Nominee Information
router.post("/", addNominee);

// Upload Attached Documents to Nominee
router.patch("/:id", updateDocumentLinkById);

// Update Nominee Information
router.put(
	"/:id",

	updateNomineeDetailsById
);

// Get Nominee Information
router.put("/:id", getNomineeDetailsById);

module.exports = router;