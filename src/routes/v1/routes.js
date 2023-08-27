const express = require("express");
const router = express.Router();

const clientRoutes = require("./controllers/client/client.route");

router.use("/v1/client", clientRoutes);

module.exports = router;
