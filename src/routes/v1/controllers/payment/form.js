const { createMongoForm } = require("../../../../utils/mongo");
const { getOrganizationByOrganizationId } = require("../../../../utils/sql/legal");

async function insertPaymentFormData(req,res){
  try{
    const {amount,name,email,organization_id,products,phone} = req.body
    console.log("%c 🍺 req.body", "color:#3f7cff", req.body);

    const organization = await getOrganizationByOrganizationId({organization_id : organization_id})
    if(!organization){
      return res.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "Bad Request! This organization does not exists"
      })
    }

    const formData = await createMongoForm({
      client_email : email,
      client_name : name,
      client_phone : phone,
      order_amount : amount,
      products : products,
      organization_id : organization_id
    })

    return res.status(200).set({"Access-Control-Allow-Origin" : "*"}).json({
      form_id : formData._id
    }) 

  }catch(error){
    console.error("Server Error in controllers/payment/forms in insertPaymentFormData ==> Error : ",error);
    return res.status(500).set({"Access-Control-Allow-Origin" : "*"}).json({
      message : "Server Error! Failed to create payment form"
    })
  }

}

module.exports.insertPaymentFormData = insertPaymentFormData;