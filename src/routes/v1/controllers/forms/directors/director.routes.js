const { Router } = require("express");
const router = Router();

const { updateDirectorDetailsById } = require("./director.controller.js"); 


router.put("/", updateDirectorDetailsById);

module.exports = router;