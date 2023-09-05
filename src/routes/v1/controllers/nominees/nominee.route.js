const express = require("express");
const router = express.Router();

const nomineeController = require("./nominee.controller"); // Nominee Controller
const nomineeValidator = require("./nominee.validator"); // Nominee Validator

// Add Nominee Information
router.post("/", nomineeValidator.addNominee, nomineeController.addNominee);

// Upload Attached Documents to Nominee
router.patch(
  "/:id",
  nomineeValidator.updateDocumentLinkById,
  nomineeController.updateDocumentLinkById
);

// Update Nominee Information
router.put(
  "/:id",
  nomineeValidator.updateNomineeDetailsById,
  nomineeController.updateNomineeDetailsById
);

// Get Nominee Information
router.put("/:id", nomineeController.getNomineeDetailsById);

module.exports = router;
