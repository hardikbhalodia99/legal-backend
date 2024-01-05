const { Router } = require("express");
const router = Router();

const UserRouter = require("./controllers/users/users.routes");
const AdminRouter = require("./controllers/admin/admin.routes")

router.use("/users", UserRouter);
router.use("/admin",AdminRouter)

module.exports = router;
