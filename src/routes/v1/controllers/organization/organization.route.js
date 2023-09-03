const express = require("express");
const router = express.Router();

const organizationController = require("./organization.controller"); // Organization Controller
const organizationValidator = require("./organization.validator"); // Organization Validator

// Add Organization Information
router.post("/", organizationValidator.addOrganization, organizationController.addOrganization);

// Upload Attached Documents to Organization
router.patch(
  "/:id",
  organizationValidator.updateDocumentLinkById,
  organizationController.updateDocumentLinkById
);

// Get Organization Information
router.put("/:id", organizationController.getOrganizationDetailsById);

module.exports = router;
