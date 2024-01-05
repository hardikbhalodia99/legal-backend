const { getProductByOrganizationIdAndSlug, getClientsOrdersByProductId ,getEmployeeByAppwriteId} = require("../../../../../utils/sql/legal")

async function getClientOrders(req,res){
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
    // if(!employee)
    // const {productSlug} = req.params

    const product = await getProductByOrganizationIdAndSlug({

    })

    const orders = await getClientsOrdersByProductId()    

  }catch(error){
    console.log("Server Error in controllers/admin/orders/index at getClientOrders ==> : ",error);

  }
}