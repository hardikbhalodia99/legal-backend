import crypto from 'crypto'
import { getMongoOrgByOrgId } from '../../../../utils/mongo/index.js';
import Razorpay from "razorpay"
import { updatePayment } from '../../../../utils/sql/legal/index.js';

export async function createPaymentSuccess(req,res){
  try{
    const {organization_id,razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;

    const mongoOrganization = await getMongoOrgByOrgId({ organization_id : organization_id})

    if(!mongoOrganization){
      return res.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "No organization found for this organization_id"
      })
    }

    const razorpayKey = mongoOrganization.razorpay_api_key
    const razorpaySecret = mongoOrganization.razorpay_api_key_secret

    const hmac =  crypto.createHmac('sha256', razorpaySecret);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generatedSignature = hmac.digest('hex');


    if (generatedSignature == razorpay_signature) {

      const razorpayInstance = new Razorpay({
        key_id: razorpayKey,
        key_secret: razorpaySecret,
      })
      console.log("signature verified");
      const order = await razorpayInstance.orders.fetch(razorpay_order_id)
      const receiptId = order['receipt'];
      await updatePayment({
        legal_payment_id : receiptId,
        external_order_id : razorpay_order_id,
        external_payment_id: razorpay_payment_id,
        payment_signature : razorpay_signature,
      });

      return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
        message : "Order updated waiting for confirmation"
      })
    }
    else{
      console.log("signature not verified");
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message : "Razorpay Signature does not match"
      })
    }


  }catch(error){
    console.error("Server Error in controllers/payment/success at createPaymentSuccess ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message : "Server Error! Failed to updated payment."
    })
  }
}