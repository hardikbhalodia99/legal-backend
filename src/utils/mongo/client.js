import ClientModel from "../../models/mongo/client.js"
import { connectToMongooseDatabase } from "./utils.js";

export async function createMongoClient({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const mongoClient = await ClientModel.create({
      client_id : client_id
    })

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at createMongoClient ==> Error : ",error);
  }
}

