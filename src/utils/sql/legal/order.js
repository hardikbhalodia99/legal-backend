const { generateRandomString } = require("../..")
const { getLegalDB, getOrderModel } = require("./utils")

async function createOrder({order_amount,quantity,reference_id,client_id,organization_id,product_id}){
  try{
    const sequelize = await getLegalDB()
    const OrderModel = await getOrderModel(sequelize)

    const order_id = "ORD" + generateRandomString()
    const order = await OrderModel.create({
      order_id : order_id,
      organization_id : organization_id,
      product_id : product_id,
      client_id : client_id,
      quantity : quantity,
      order_amount : order_amount,
      reference_id : reference_id
    })

    return order
  }catch(error){
    console.error("Server Error in sql/order at createOrder ==> Error : ",error);
  }
}

module.exports.createOrder = createOrder;