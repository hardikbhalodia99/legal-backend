const { connectToMongooseDatabase } = require("./utils");
const ClientModel = require("../../models/mongo/client.js")


async function createMongoClient({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase  ()
    const mongoClient = await ClientModel.create({
      client_id : client_id
    })

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at createMongoClient ==> Error : ",error);
  }
}

module.exports.createMongoClient = createMongoClient;