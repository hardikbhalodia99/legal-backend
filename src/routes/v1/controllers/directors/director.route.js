const { Router } = require("express");
const router = Router();

const {
	addDirector,
	updateDocumentLinkById,
	getDirectorDetailsById,
} = require("./director.controller.js"); // Director Controller

// Add Director Information
router.post("/", addDirector);

// Upload Attached Documents to Director
router.patch("/:id", updateDocumentLinkById);

// Get Director Information
router.put("/:id", getDirectorDetailsById);

module.exports = router;