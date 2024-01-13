const { validateAdminAuth } = require("../../../../../middleware/auth")
const { getMongoClientByClientId } = require("../../../../../utils/mongo")
const { getEmployeeByAppwriteId, getProductByOrganizationIdAndSlug } = require("../../../../../utils/sql/legal")

async function getFormDetails(req,res){
  try{
    const validationResponse = await validateAdminAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    const organization_id = employee.organization_id

    const {productSlug} = req.params

    const product = await getProductByOrganizationIdAndSlug({
      organization_id  : organization_id,
      product_slug : productSlug
    })

    if(!product){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "No product found for this slug"
      }) 
    }

    const mongoClient = await getMongoClientByClientId({client_id : client.client_id})
    console.log("%c 🥟 mongoClient", "color:#7f2b82", mongoClient);

    let directorDetails = null
    let nomineeDetails = null
    if(["llp","opc","pvt-ltd"].includes(productSlug)){
      directorDetails = await getDirectorsByClientId({
        client_id : client.client_id
      })

      if(productSlug === "opc"){
        nomineeDetails = await getNomineesByClientId({
          client_id : client.client_id
        })
      }
    }


    let responseData = {
      formFilled : mongoClient.form_filled ? mongoClient.form_filled : false,
      formData : {
        companyDetails : mongoClient.company_details ? mongoClient.company_details : null,
        officeDetails : mongoClient.office_details ? mongoClient.office_details : null,
        directorDetails : directorDetails,
        nomineeDetails : nomineeDetails
      }
    }

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json(responseData)
  }catch(error){
    console.error("Server error in controllers/admin/form at getFormDetails ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to get form details."
    })
  }
}

module.exports.getFormDetails = getFormDetails;