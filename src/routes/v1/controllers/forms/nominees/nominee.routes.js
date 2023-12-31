const { Router } = require("express");
const router = Router();

const {updateNomineeDetailsById} = require("./nominee.controller.js");

router.put("/",updateNomineeDetailsById);

module.exports = router;