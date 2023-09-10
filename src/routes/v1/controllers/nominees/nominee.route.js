import { Router } from "express";
const router = Router();

import {
	addNominee,
	updateDocumentLinkById,
	updateNomineeDetailsById,
	getNomineeDetailsById,
} from "./nominee.controller.js"; // Nominee Controller

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

export default router;
