import { Router } from "express";
const router = Router();

import {
	addCompanyDetails,
	updateOfficeDetailsById,
	updateDirectorDetailsById,
	updateNomineeDetailsById,
	getClientDetailsById,
} from "./client.controller.js"; // Client Controller

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

export default router;
