import { Router } from "express";
const router = Router();
import { createPaymentOrder } from "./order.js";
import { getPaymentStatus } from "./status.js";
import { createPaymentSuccess } from "./success.js";

router.post("/create-order", createPaymentOrder);
router.post("/status", getPaymentStatus);
router.post("/success", createPaymentSuccess);

export default router;
