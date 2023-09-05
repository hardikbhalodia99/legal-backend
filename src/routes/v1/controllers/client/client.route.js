const express = require("express");
const router = express.Router();

const clientController = require("./client.controller"); // Client Controller
const clientValidator = require("./client.validator"); // Client Validator

// Add Company Details
router.post(
  "/",
  clientValidator.addCompanyDetails,
  clientController.addCompanyDetails
);

// Add Office Details
router.patch(
  "/office/:id",
  clientValidator.updateOfficeDetailsById,
  clientController.updateOfficeDetailsById
);

// Add Director Information
router.patch(
  "/director/:id",
  clientValidator.updateDirectorDetailsById,
  clientController.updateDirectorDetailsById
);

// Add Nominee Information
router.patch(
  "/nominee/:id",
  clientValidator.updateNomineeDetailsById,
  clientController.updateNomineeDetailsById
);

// Update Client Information
router.put(
  "/:id",
  clientValidator.updateClientDetailsById,
  clientController.updateClientDetailsById
);

// Get Client Information
router.put("/:id", clientController.getClientDetailsById);

module.exports = router;
