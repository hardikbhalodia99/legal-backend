import { createAppwriteAccount } from "../../utils/appwrite/client.js";
import { createMongoClient } from "../../utils/mongo/index.js";
import { getOrganizationByOrganizationId, confirmPayment, getProductByOrganizationIdAndSlug, createOrder } from "../../utils/sql/legal/index.js";
import { createSQLClient } from "../../utils/sql/legal/client.js";

export async function processRazorpayEventsDirect(messageAttributes){
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

    const mongoClient = await createMongoClient({
      client_id : client.client_id,
    })
    
    if(productKeys.include('pvt-ltd')){
      const pvtProduct = await getProductByOrganizationIdAndSlug({
        organization_id : organization_id,
        product_slug : 'pvt-ltd'
      })
      console.log("%c 🌽 pvtProduct", "color:#7f2b82", pvtProduct);

      const order = await createOrder({
        organization_id : organization_id,
        product_id : pvtProduct.product_id,
        client_id : client.client_id,
        order_amount : pvtProduct.product_price,
        quantity : 1,
        reference_id : payment_id
      })
      console.log("%c 🥚 order", "color:#465975", order);

      
    }





  }catch(error){
    console.error("Server Error in sqs/process-razorpay-events-direct ==> Error : ",error)
  }
}

