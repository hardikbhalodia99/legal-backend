const { generateRandomString } = require("../..")
const { getLegalDB, getOrderModel } = require("./utils")
const { QueryTypes } = require("sequelize")

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

async function getAllClientOrdersByClientId({client_id}){
  try{
    const sequelize = await getLegalDB()
    const OrderModel = await getOrderModel(sequelize)

    const orders = await OrderModel.findAll({
      where : {
        client_id : client_id,
      },
      raw :true
    })

    return orders
  }catch(error){
    console.error("Server Error in sql/order at getAllClientOrdersByClientId ==> Error : ",error);
  }
}

async function getClientsOrdersByProductId({product_id}){
  try{
    const sequelize = await getLegalDB()
    const clientOrders = await sequelize.query(`
      select 
      orders.client_id,client_name, client_email,orders.createdAt 
      from orders 
      left join clients 
      on orders.client_id = clients.client_id
      where product_id = '${product_id}' 
      order by orders.createdAt desc
    `,{type : QueryTypes.SELECT});


    return clientOrders
  }catch(error){
    console.error("Server Error at sql/client in getClientByClientId ==> Error : ",error)
  }
}

module.exports.createOrder = createOrder;
module.exports.getAllClientOrdersByClientId = getAllClientOrdersByClientId;
module.exports.getClientsOrdersByProductId = getClientsOrdersByProductId;