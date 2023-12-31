const { Router } = require("express");
const router = Router();

const UserRouter = require("./controllers/users/users.routes");

router.use("/users", UserRouter);

module.exports = router;
