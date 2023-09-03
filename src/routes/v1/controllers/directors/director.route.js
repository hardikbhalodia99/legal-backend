const express = require("express");
const router = express.Router();

const directorController = require("./director.controller"); // Director Controller
const directorValidator = require("./director.validator"); // Director Validator

// Add Director Information
router.post("/", directorValidator.addDirector, directorController.addDirector);

// Upload Attached Documents to Director
router.patch(
  "/:id",
  directorValidator.updateDocumentLinkById,
  directorController.updateDocumentLinkById
);

// Update Director Information
router.put(
  "/:id",
  directorValidator.updateDirectorDetailsById,
  directorController.updateDirectorDetailsById
);

// Get Director Information
router.put("/:id", directorController.getDirectorDetailsById);

module.exports = router;
