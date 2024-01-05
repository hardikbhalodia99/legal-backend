const { generateRandomString } = require("../../index");
const { updateAppwriteClientData, enableDisableAppwriteClient, createAppwriteAccount } = require("../../appwrite/client");
const { getLegalDB, getEmployeeModel } = require("./utils");

async function createNewEmployee({employee_name,employee_email,password ,employee_phone,organization_id,employee_type}){
  try {
    const sequelize = await getLegalDB();
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employee_id = "EMP" + generateRandomString()

    const appwriteUser = await createAppwriteAccount({
      email : employee_email,
      name : employee_name,
      password : password,
      type : employee_type
    })

    const employee = await EmployeeModel.create({
      employee_id : employee_id,
      organization_id : organization_id,
      employee_type : employee_type,
      appwrite_id : appwriteUser.$id,
      employee_name : employee_name,
      employee_email : employee_email,
      employee_phone : employee_phone
    });


    return employee;
  }
  catch(error){
    console.error("Server Error in sql/employee at createNewEmployee ==> Error : ",error);
  }
}

async function getEmployeeByAppwriteId({appwrite_id}){
  try{
    const sequelize = await getLegalDB()
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employee = await EmployeeModel.findOne({
      where : {
        appwrite_id : appwrite_id
      },
      raw : true

    })

    return employee
  }catch(error){
    console.error("Server Error at sql/employee in getEmployeeByAppwriteId ==> Error : ",error)
  }
}

async function getEmployeeByEmployeeId({employee_id}){
  try{
    const sequelize = await getLegalDB()
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employee = await EmployeeModel.findOne({
      where : {
        employee_id : employee_id
      },
      raw : true

    })

    return employee
  }catch(error){
    console.error("Server Error at sql/employee in getEmployeeByEmployeeId ==> Error : ",error)
  }
}

async function getAllOrganizationEmployees({organization_id}){
  try{
    const sequelize = await getLegalDB()
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employees = await EmployeeModel.findAll({
      where : {
        organization_id : organization_id
      },
      raw : true

    })

    return employees
  }catch(error){
    console.error("Server Error at sql/employee in getAllOrganizationEmployees ==> Error : ",error)
  }
}

async function updateEmployeeDetailsById({employee_id,employee_name,employee_email,employee_phone,appwrite_id}){
  try{
    const sequelize = await getLegalDB()
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employees = await EmployeeModel.update(
      {
        employee_email : employee_email,
        employee_name : employee_name,
        employee_phone : employee_phone
      },
      {
        where : {
          employee_id : employee_id
        }
      }
    )

    await updateAppwriteClientData({
      email : employee_email,
      id : appwrite_id,
      name : employee_name,
      phone : employee_phone
    })

    return employees
  }catch(error){
    console.error("Server Error at sql/employee in updateEmployeeDetailsById ==> Error : ",error)
  }
}

async function disableEmployeeById({employee_id,type,appwrite_id}){
  try{
    const sequelize = await getLegalDB()
    const EmployeeModel = await getEmployeeModel(sequelize);

    const employees = await EmployeeModel.update(
      {
        disabled : type === "enable" ? false : true,
      },
      {
        where : {
          employee_id : employee_id
        }
      }
    )

    await enableDisableAppwriteClient({
      id : appwrite_id,
      type : type
    })

    return employees
  }catch(error){
    console.error("Server Error at sql/employee in disableEmployeeById ==> Error : ",error)
  }
}




module.exports.createNewEmployee = createNewEmployee;
module.exports.getEmployeeByAppwriteId = getEmployeeByAppwriteId;
module.exports.getAllOrganizationEmployees = getAllOrganizationEmployees;
module.exports.updateEmployeeDetailsById = updateEmployeeDetailsById;
module.exports.disableEmployeeById = disableEmployeeById;
module.exports.getEmployeeByEmployeeId = getEmployeeByEmployeeId;