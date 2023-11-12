const Razorpay = require("razorpay")
const { createPayment } = require("../../../../utils/sql/legal/index.js")
const { getMongoOrgByOrgId } = require("../../../../utils/mongo/index.js")
const { generateRandomString } = require("../../../../utils/index.js")


async function createPaymentOrder(req,res){
  try{
    const {amount,name,email,organization_id} = req.body
    console.log("%c 🍺 req.body", "color:#3f7cff", req.body);

    const mongoOrganization = await getMongoOrgByOrgId({ organization_id : organization_id})
    console.log("%c 🥛 mongoOrganization", "color:#2eafb0", mongoOrganization);

    if(!mongoOrganization){
      return res.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "No organization found for this organization_id"
      })
    }

    const razorpayKey = mongoOrganization.razorpay_api_key
    const razorpaySecret = mongoOrganization.razorpay_api_key_secret

    const razorpayInstance = new Razorpay({
      key_id: razorpayKey,
      key_secret: razorpaySecret,
    })

    const receiptId = "RPT"+ generateRandomString() 
    console.log("%c 🍰 receiptId", "color:#ffdd4d", receiptId);

    let notes = {}
    if(name) notes['name'] = name
    if(email) notes['email'] = email

    const order = await razorpayInstance.orders.create({
        "amount": amount*100,
        "currency": "INR",
        "receipt": receiptId,
        "notes": notes
    })
    console.log("%c 🍯 order", "color:#ed9ec7", order);
    const orderId = order.id;
    
    await createPayment({
      legal_payment_id : receiptId,
      external_order_id : orderId,
      payment_provider : "razorpay"
    });

    return res.status(201).set({"Access-Control-Allow-Origin": "*"}).json({
      razorpay_order_id : orderId,
      razorpay_key : razorpayKey
    })
    
  }catch(error){
    console.error("Server Error in controllers/payment/orders in createPaymentOrder ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin" : "*"}).json({
      message : "Server Error! Failed to create payment order"
    })
  }
}

module.exports.createPaymentOrder = createPaymentOrder