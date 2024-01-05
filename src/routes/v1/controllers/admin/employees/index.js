const { validateAuth } = require("../../../../../middleware/auth");
const { updateAppwriteClientPassword } = require("../../../../../utils/appwrite/client");
const { getAllOrganizationEmployees, getEmployeeByAppwriteId, getEmployeeByEmployeeId, updateEmployeeDetailsById, disableEmployeeById, createNewEmployee } = require("../../../../../utils/sql/legal");

async function getAllEmployees(req,res){
  try{

    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employees details"
      })
    }
    if(employee.employee_type !== "ADMIN"){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to perform this action"
      })
    }
    const employees = await getAllOrganizationEmployees({organization_id : employee.organization_id})

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      employees : employees
    })


  }catch(error){
    console.error("Server Error in admin/employees ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to get employees details"
    })
  }
}

async function updateEmployeeDetails(req,res){
  try{

    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employees details"
      })
    }
    if(employee.employee_type !== "ADMIN"){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to perform this action"
      })
    }

    const {employee_name,employee_email,employee_phone, employee_id} = req.body
    const employeeData = await getEmployeeByEmployeeId({employee_id : employee_id})

    const updatedEmployee = await updateEmployeeDetailsById({
      appwrite_id : employeeData.appwrite_id,
      employee_email : employee_email,
      employee_id : employee_id,
      employee_name : employee_name,
      employee_phone : employee_phone
    })

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      updatedEmployee : updatedEmployee
    })


  }catch(error){
    console.error("Server Error in admin/employees at updateEmployeeDetails ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to update employees details"
    })
  }

}

async function updateEmployeeStatus(req,res){
  try{

    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employees details"
      })
    }
    if(employee.employee_type !== "ADMIN"){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to perform this action"
      })
    }

    const { employee_id, status} = req.body
    if(!["enable" , "disable"].includes(status)){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Please send appropriate action for status"
      })
    }

    const employeeData = await getEmployeeByEmployeeId({employee_id : employee_id})

    const updatedEmployee = await disableEmployeeById({
      appwrite_id : employeeData.appwrite_id,
      type : status,
      employee_id : employee_id
    })

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      updatedEmployee : updatedEmployee
    })


  }catch(error){
    console.error("Server Error in admin/employees at updateEmployeeStatus ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to update employees status"
    })
  }

}

async function updateEmployeePassword(req,res){
  try{

    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employees details"
      })
    }
    if(employee.employee_type !== "ADMIN"){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to perform this action"
      })
    }

    const { employee_id, password} = req.body

    const employeeData = await getEmployeeByEmployeeId({employee_id : employee_id})

    await updateAppwriteClientPassword({
      appwrite_id : employeeData.appwrite_id,
      password : password
    })

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      message : "Password updated successfully"
    })


  }catch(error){
    console.error("Server Error in admin/employees at updateEmployeePassword ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to update employees status"
    })
  }

}

async function createEmployee(req,res){
  try{

    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employees details"
      })
    }
    if(employee.employee_type !== "ADMIN"){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to perform this action"
      })
    }

    const {employee_name,employee_email,employee_phone, password,employee_type} = req.body

    const employeeData = await createNewEmployee({
      employee_email : employee_email,
      employee_name : employee_name,
      employee_phone : employee_phone,
      employee_type : employee_type,
      organization_id : employee.organization_id,
      password : password

    })

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      employeeData : employeeData
    })


  }catch(error){
    console.error("Server Error in admin/employees at createEmployee ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to update employees status"
    })
  }
}

module.exports.getAllEmployees = getAllEmployees;
module.exports.updateEmployeeDetails = updateEmployeeDetails;
module.exports.updateEmployeeStatus = updateEmployeeStatus;
module.exports.updateEmployeePassword = updateEmployeePassword;
module.exports.createEmployee = createEmployee;