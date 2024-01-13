const { Router } = require("express");
const router = Router();

const OrdersRouter = require("./orders/orders.routes")
const EmployeeRouter = require("./employees/employees.routes")
const FormRouter = require("./form/form.routes")

router.use("/orders",OrdersRouter)
router.use("/employees",EmployeeRouter)
router.use("/forms",FormRouter)
module.exports = router;
