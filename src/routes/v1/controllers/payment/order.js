import Razorpay from "razorpay"
import { createPayment } from "../../../../utils/sql/legal/index.js"
import { getMongoOrgByOrgId } from "../../../../utils/mongo/index.js"
import { generateRandomString } from "../../../../utils/index.js"


export async function createPaymentOrder(req,res){
  try{
    const {amount,name,email,organization_id} = req.body

    const mongoOrganization = await getMongoOrgByOrgId({ organization_id : organization_id})

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

    let notes = {}
    if(name) notes['name'] = name
    if(email) notes['email'] = email

    const order = await razorpayInstance.orders.create({
        "amount": amount*100,
        "currency": "INR",
        "receipt": receiptId,
        "notes": notes
    })
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