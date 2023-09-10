import OrganizationModel from "../../models/mongo/organization.js"

import { connectToMongooseDatabase } from "./utils.js";

export async function createMongoOrganization({organization_id,razorpay_api_key,razorpay_api_key_secret}){
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