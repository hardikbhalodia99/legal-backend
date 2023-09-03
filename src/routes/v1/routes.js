const express = require("express");
const router = express.Router();

const clientRoutes = require("./controllers/client/client.route");
const directorRoutes = require("./controllers/directors/director.controller");
const nomineeRoutes = require("./controllers/nominees/nominee.controller");

router.use("/client", clientRoutes);
router.use("/director", directorRoutes);
router.use("/nominee", nomineeRoutes);

module.exports = router;
