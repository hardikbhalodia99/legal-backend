const {Router} = require("express")
const { createEmployee,getAllEmployees,updateEmployeeDetails,updateEmployeePassword,updateEmployeeStatus } = require("./index")
const router = Router()

router.post("/create",createEmployee)
router.put("/update-details",updateEmployeeDetails)
router.put("/update-status",updateEmployeeStatus)
router.put("/update-password",updateEmployeePassword)
router.get("/all",getAllEmployees)

module.exports = router
