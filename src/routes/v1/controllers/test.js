import { createMongoOrganization } from "../../../utils/mongo/index.js"
import { createOrganization, createProduct } from "../../../utils/sql/legal/index.js"

export async function testFunction (req,res){
  try{

    // const organization = await createOrganization({
    //   organization_name : "Legal Team"
    // })

    const mongoOrganization = await createMongoOrganization({
      organization_id : "ORG4uJNgdZPKnyU",
      razorpay_api_key : "rzp_test_P3bOXbO6IRXbwk",
      razorpay_api_key_secret : "C9IVIMBEQBqhIL2kg6QS0dZf"
    })

    // const pvtProduct = await createProduct({
    //   organization_id : organization.organization_id,
    //   product_name : "Private Limited Company Registration",
    //   product_price : 5800,
    //   product_discount : 0,
    //   product_slug : "pvt-ltd"
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
    //   product_price : 944,
    //   product_discount : 0,
    //   product_slug : "pvt-directors"
    // })    

  }catch(error){
    console.log(error)
  }
}
