const { createAppwriteAccount } = require("../../../utils/appwrite/client.js")
const { addToSQSQueue } = require("../../../utils/aws/sqs.js")
const { createMongoOrganization } = require("../../../utils/mongo/index.js")
const { createOrganization, createProduct, createNewEmployee } = require("../../../utils/sql/legal/index.js")

async function testFunction (req,res){
  try{

  //   let eventsData = {
  //     rzpData : {
  //         StringValue: JSON.stringify({"hello" : "hello"}),
  //         DataType: 'String'
  //     }
  // }
  // await addToSQSQueue({
  //     data : eventsData,
  //     type: "PROCESS_RAZORPAY_EVENTS_DIRECT"
  // });
    const organization = {
      organization_id : "ORG4uJNgdZPKnyU"
    }
    await createNewEmployee({
      employee_email : "hardik@climes.io",
      employee_name : "hardik",
      password : "helloRTS.com", 
      employee_phone : "+916355129211",
      employee_type : "ADMIN",
      organization_id : "ORG4uJNgdZPKnyU"

     

    })

    // const mongoOrganization = await createMongoOrganization({
    //   organization_id : "ORG4uJNgdZPKnyU",
    //   razorpay_api_key : "rzp_test_P3bOXbO6IRXbwk",
    //   razorpay_api_key_secret : "C9IVIMBEQBqhIL2kg6QS0dZf"
    // })

    // const pvtProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "Limited Liability Partnership Registration",
    //   product_price : 5400,
    //   product_discount : 0,
    //   product_slug : "llp"
    // })

    // const gstProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "GST Registration",
    //   product_price : 944,
    //   product_discount : 0,
    //   product_slug : "gst"
    // })

    // const msmeProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "MSME Registration",
    //   product_price : 944,
    //   product_discount : 0,
    //   product_slug : "msme"
    // })

    // const rocProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "New Company ROC Compliance",
    //   product_price : 944,
    //   product_discount : 0,
    //   product_slug : "roc"
    // })

    // const dirProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "Additional Directors",
    //   product_price : 844,
    //   product_discount : 0,
    //   product_slug : "llp-directors"
    // })  
    
    return res.status(201).set({"Access-Control-Allow-Origin": "*"}).json({
      success : true,
    })

  }catch(error){
    console.log(error)
  }
}

module.exports.testFunction = testFunction