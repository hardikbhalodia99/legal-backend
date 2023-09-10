import { getMongoOrgByOrgId } from "../../../../utils/mongo/index.js";
import { getPayment } from "../../../../utils/sql/legal/index.js";

export async function getPaymentStatus(req,res){
  try{
    const {organization_id,razorpay_order_id,razorpay_payment_id} = req.body;

    const mongoOrganization = await getMongoOrgByOrgId({ organization_id : organization_id})

    if(!mongoOrganization){
      return res.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "No organization found for this organization_id"
      })
    }

    const payment = await getPayment({
      external_order_id : razorpay_order_id,
      external_payment_id : razorpay_payment_id
    });

    if(payment){
      return res.status(200).set({"Access-Control-Allow-Origin" : "*"}).json({
        payment_received : payment.payment_status === "PAID_CONFIRMED" ? true : false
      })
    }else{
      return res.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "Failed to get payment status. No payment exists"
      })
    }

  }catch(error){
    console.error("Server Error in controllers/payment/status at getPaymentStatus ==> Error : ",error)
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message : "Server Error! Failed to get payment status."
    })
  }
}