const OrganizationModel = require("../../models/mongo/organization.js");
const { connectToMongooseDatabase } = require("./utils.js");


async function createMongoOrganization({organization_id,razorpay_api_key,razorpay_api_key_secret}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const mongoOrganization = await OrganizationModel.create({
      organization_id : organization_id,
      razorpay_api_key_secret : razorpay_api_key_secret,
      razorpay_api_key : razorpay_api_key
    })

    return mongoOrganization

  }catch(error){
    console.error("Server Error in mongo/organization at createMongoOrganization ==> Error : ",error);
  }
}

async function getMongoOrgByOrgId({organization_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const mongoOrganization = await OrganizationModel.findOne({
      organization_id : organization_id,
    })

    return mongoOrganization

  }catch(error){
    console.error("Server Error in mongo/organization at getMongoOrgByOrgId ==> Error : ",error);
  }
}

module.exports.createMongoOrganization = createMongoOrganization;
module.exports.getMongoOrgByOrgId = getMongoOrgByOrgId;