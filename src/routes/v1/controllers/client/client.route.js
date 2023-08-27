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
  "/:id",
  clientValidator.updateOfficeDetailsById,
  clientController.updateOfficeDetailsById
);


module.exports = router;
