const { validateAdminAuth } = require("../../../../../middleware/auth")
const { getProductByOrganizationIdAndSlug, getClientsOrdersByProductId ,getEmployeeByAppwriteId} = require("../../../../../utils/sql/legal")

async function getClientOrders(req,res){
  try{
    const validationResponse = await validateAdminAuth(req,res)
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
    const organization_id = employee.organization_id

    const {productSlug} = req.params

    const product = await getProductByOrganizationIdAndSlug({
      organization_id  : organization_id,
      product_slug : productSlug
    })

    if(!product){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "No product found for this slug"
      }) 
    }

    const orders = await getClientsOrdersByProductId({product_id : product.product_id})    

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      orders : orders
    })
    

  }catch(error){
    console.log("Server Error in controllers/admin/orders/index at getClientOrders ==> : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to get orders."
    })
  }
}

module.exports.getClientOrders = getClientOrders;