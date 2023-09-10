import { Router } from "express";
const router = Router();

import clientRoutes from "./controllers/client/client.route.js";
import directorRoutes from "./controllers/directors/director.route.js";
import nomineeRoutes from "./controllers/nominees/nominee.route.js";
import ProductRoutes from "./controllers/product/product.route.js";
import { testFunction } from "./controllers/test.js";

router.use("/client", clientRoutes);
router.use("/director", directorRoutes);
router.use("/nominee", nomineeRoutes);

router.use("/product",ProductRoutes)

router.get("/test",testFunction)

export default router;
