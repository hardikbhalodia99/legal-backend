const { Router } = require("express");
const router = Router();

const OrdersRouter = require("./orders/orders.routes")
const EmployeeRouter = require("./employees/employees.routes")

// router.use("/orders",OrdersRouter)
router.use("/employees",EmployeeRouter)
module.exports = router;
