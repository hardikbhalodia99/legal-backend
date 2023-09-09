const OrganizationMongooseModel = require("../../models/mongo/organization");
const { connectToMongooseDatabase } = require("./utils");

async function createMongoOrganization({organization_id,razorpay_api_key,razorpay_api_key_secret}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const mongoOrganization = await OrganizationMongooseModel.create({
      organization_id : organization_id,
      razorpay_api_key_secret : razorpay_api_key_secret,
      razorpay_api_key : razorpay_api_key
    })

    return mongoOrganization

  }catch(error){
    console.error("Server Error in mongo/organization at createMongoOrganization ==> Error : ",error);
  }
}

module.exports.createMongoOrganization = createMongoOrganization;