const { validateAuth } = require("../../../../middleware/auth")
const { getMongoClientByClientId, getNomineesByClientId, getDirectorsByClientId } = require("../../../../utils/mongo")
const { getClientByAppwriteId,getAllClientOrdersByClientId,getAllOrganizationProducts } = require("../../../../utils/sql/legal")

async function getClientFormDetails(req,res){
  console.log("%c 🌽 req", "color:#b03734", req);
  try{
    const validationResponse = await validateAuth(req,res)
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

      const client = await getClientByAppwriteId({appwrite_id : appwrite_id})
      console.log("%c 🌶 client", "color:#6ec1c2", client);
      if(!client){
        return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
          message: "Failed to fetch client details"
        })
      }

      const mongoClient = await getMongoClientByClientId({client_id : client.client_id})
      console.log("%c 🥟 mongoClient", "color:#7f2b82", mongoClient);
      const clientOrders = await getAllClientOrdersByClientId({client_id : client.client_id})
      console.log("%c 🥒 clientOrders", "color:#42b983", clientOrders);
      const clientProducts = await getAllOrganizationProducts({organization_id : client.organization_id})
      console.log("%c 🎂 clientProducts", "color:#4fff4B", clientProducts);

      let formOrderSlug = null
      for(let i=0;i<clientOrders.length;i++){
        let order = clientOrders[i]

        let product = clientProducts.find((product) => product.product_id === order.product_id)
        if(["pvt-ltd","llp", "opc"].includes(product.product_slug)){
          formOrderSlug = product.product_slug
          break;
        }
      }

      let directorDetails = null
      if(formOrderSlug){
        directorDetails = await getDirectorsByClientId({
          client_id : client.client_id
        })
      }

      let nomineeDetails = null
      if(formOrderSlug === "opc"){
        nomineeDetails = await getNomineesByClientId({
          client_id : client.client_id
        })
      }

      let responseData = {
        formFilled : mongoClient.form_filled ? mongoClient.form_filled : false,
        formSlug : formOrderSlug,
        formData : {
          companyDetails : mongoClient.company_details ? mongoClient.company_details : null,
          officeDetails : mongoClient.office_details ? mongoClient.office_details : null,
          directorDetails : directorDetails,
          nomineeDetails : nomineeDetails
        }
      }

      return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json(responseData)

  }catch(error){
    console.error("Server Error in v1/controllers/client at getClientFormDetails ==> Error : ",error)
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message : "Server Error! Failed to get client form details"
    })
  }
}

module.exports.getClientFormDetails = getClientFormDetails;