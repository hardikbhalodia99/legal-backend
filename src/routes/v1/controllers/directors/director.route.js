import { Router } from "express";
const router = Router();

import {
	addDirector,
	updateDocumentLinkById,
	getDirectorDetailsById,
} from "./director.controller.js"; // Director Controller

// Add Director Information
router.post("/", addDirector);

// Upload Attached Documents to Director
router.patch("/:id", updateDocumentLinkById);

// Get Director Information
router.put("/:id", getDirectorDetailsById);

export default router;
