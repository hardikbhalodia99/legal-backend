const ClientMongooseModel = require("../../models/mongo/client");
const { connectToMongooseDatabase } = require("./utils");

async function createMongoClient({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const mongoClient = await ClientMongooseModel.create({
      client_id : client_id
    })
  }catch(error){
    console.error("Server Error in mongo/client at createMongoClient ==> Error : ",error);
  }
}

module.exports.createMongoClient = createMongoClient;