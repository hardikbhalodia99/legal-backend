const { createAppwriteAccount } = require("../utils/appwrite/client");
const { createMongoClient, getMongoFormByFormId, createMultipleDirectors, createMultipleNominees } = require("../utils/mongo");
const { getOrganizationByOrganizationId, confirmPayment, createSQLClient, getProductByOrganizationIdAndSlug, createOrder } = require("../utils/sql/legal");

async function processRazorpayEventsDirect(messageAttributes){
  try{
  
    const {rzpData} = messageAttributes;
    console.log("%c 🍺 rzpData", "color:#ea7e5c", rzpData);
    const rzpDataString = rzpData.stringValue;
    const finalDataString = JSON.parse(rzpDataString);
    console.log("%c 🍿 finalDataString", "color:#93c0a4", finalDataString);
  
    const {form_id,payment_id,order_id,amount} = finalDataString
  
    const formData = await getMongoFormByFormId({form_id : form_id})
    if(!formData){
      console.error("NO FORM FOUND BUT GOT PAYMENT")
      return
    }

    const { organization_id,client_email,client_name,products } = formData

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
  
    const password = client_email
  
    const appwriteUser = await createAppwriteAccount({
      email : client_email,
      name : client_name,
      password : password
    })
  
    const appwrite_user_id = appwriteUser.$id
  
    const client = await createSQLClient({
      appwrite_id : appwrite_user_id,
      client_email : client_email,
      client_name : client_name,
      organization_id : organization_id
    })
  
    
  
    const mongoClient = await createMongoClient({
      client_id : client.client_id,
    })

    for (let i = 0; i < products.length; i++) {
      const product = products[i];
      
      const pvtProduct = await getProductByOrganizationIdAndSlug({
        organization_id : organization_id,
        product_slug : product.product_slug
      })
      console.log("%c 🌽 pvtProduct", "color:#7f2b82", pvtProduct);
  
      const order = await createOrder({
        organization_id : organization_id,
        product_id : pvtProduct.product_id,
        client_id : client.client_id,
        order_amount : pvtProduct.product_price,
        quantity : product.quantity,
        reference_id : payment_id
      })
      console.log("%c 🥚 order", "color:#465975", order);

      if(["pvt-ltd", "llp", "opc"].includes(product.product_slug)){
        await createMultipleDirectors({client_id : client.client_id,total_directors : 2,begin_with : 1 })
        
        if(product.product_slug === "opc"){
          await createMultipleNominees({client_id : client.client_id})
        } 
      }


      if(["pvt-directors", "llp-directors", "opc-directors"].includes(product.product_slug)){
        const total_directors = parseInt(product.quantity)
        await createMultipleDirectors({client_id : client.client_id,total_directors : total_directors,begin_with : 3 })
      }


    }
    
    
  
  
  
  
  
  }catch(error){
    console.error("Server Error in sqs/process-razorpay-events-direct ==> Error : ",error)
  }
}

module.exports.processRazorpayEventsDirect = processRazorpayEventsDirect;