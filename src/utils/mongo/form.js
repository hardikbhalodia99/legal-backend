const { connectToMongooseDatabase } = require("./utils");
const FormModel = require("../../models/mongo/form.js")


async function createMongoForm({organization_id ,client_name,client_email,products,order_amount,client_phone}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()

    const mongoForm = await FormModel.create({
      organization_id : organization_id,
      client_name : client_name,
      client_email : client_email,
      client_phone : client_phone,
      products : products,
      order_amount : order_amount,
    })

    return mongoForm
  }catch(error){
    console.error("Server Error in mongo/form at createMongoForm ==> Error : ",error);
  }
}

async function getMongoFormByFormId({form_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase  ()
    const mongoForm = await FormModel.findOne({
      _id : form_id
    })

    return mongoForm
  }catch(error){
    console.error("Server Error in mongo/form at getMongoFormByFormId ==> Error : ",error);
  }
}


module.exports.createMongoForm = createMongoForm;
module.exports.getMongoFormByFormId = getMongoFormByFormId;