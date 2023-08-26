const { createAppwriteAccount } = require("../../utils/appwrite/client");
const { getOrganizationByOrganizationId, confirmPayment } = require("../../utils/sql/legal");
const { createSQLClient } = require("../../utils/sql/legal/client");

async function processRazorpayEventsDirect(messageAttributes){
  try{

    const {rzpData} = messageAttributes;
    console.log("%c 🍺 rzpData", "color:#ea7e5c", rzpData);
    const rzpDataString = rzpData.stringValue;
    const finalDataString = JSON.parse(rzpDataString);
    console.log("%c 🍿 finalDataString", "color:#93c0a4", finalDataString);

    const {organization_id , name,email,amount,products,payment_id,order_id} = finalDataString

    const organization = await getOrganizationByOrganizationId({
      organization_id : organization_id
    })

    if(!organization){
      console.error("INVALID ORGANIZATION_ID")
      return
    }

    await confirmPayment({
      external_order_id : order_id,
      external_payment_id : payment_id
    })

    const password = email

    const appwriteUser = await createAppwriteAccount({
      email : email,
      name : name,
      password : password
    })

    const appwrite_user_id = appwriteUser.$id

    const client = await createSQLClient({
      appwrite_id : appwrite_user_id,
      client_email : email,
      client_name : name,
      organization_id : organization_id
    })

    let productKeys = Object.keys(products)

    
    if(productKeys.include('pvt-ltd')){

    }





  }catch(error){
    console.error("Server Error in sqs/process-razorpay-events-direct ==> Error : ",error)
  }
}

module.exports.processRazorpayEventsDirect = processRazorpayEventsDirect;