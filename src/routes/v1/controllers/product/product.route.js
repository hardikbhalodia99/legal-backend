import { Router } from "express";
const router = Router();

import { getOrganizationProductDetailsById } from "./index.js";

router.get("/:organization_id/:slug",getOrganizationProductDetailsById)

export default router;
