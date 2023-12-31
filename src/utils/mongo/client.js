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

async function getMongoClientByClientId({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase  ()
    const mongoClient = await ClientModel.findOne({
      client_id : client_id
    })

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at getMongoClientByClientId ==> Error : ",error);
  }
}

async function updateCompanyDetailsByClientId({client_id,company_details}){
  try{
    const mongoConnection  = await connectToMongooseDatabase  ()
    const mongoClient = await ClientModel.findOneAndUpdate(
      {
        client_id: client_id,
      },
      {
        $set: {
          'company_details.company_email': company_details && company_details.company_email ? company_details.company_email : null,
          'company_details.company_name_priority_1': company_details && company_details.company_name_priority_1 ? company_details.company_name_priority_1 : null,
          'company_details.company_name_priority_2': company_details && company_details.company_name_priority_2 ? company_details.company_name_priority_2 : null,
          'company_details.company_name_priority_3': company_details && company_details.company_name_priority_3 ? company_details.company_name_priority_3 : null,
          'company_details.company_name_priority_4': company_details && company_details.company_name_priority_4 ? company_details.company_name_priority_4 : null,
          'company_details.company_objective': company_details && company_details.company_objective ? company_details.company_objective : null
        },
      },
      {
        new: true,
      }
    )

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at updateCompanyDetailsByClientId ==> Error : ",error);
  }
}

async function updateOfficeDetailsByClientId({client_id,office_details}){
  try{
    const mongoConnection  = await connectToMongooseDatabase  ()
    const mongoClient = await ClientModel.findOneAndUpdate(
      {
        client_id: client_id,
      },
      {
        $set: {
          'office_details.owner_name': office_details && office_details.owner_name ? office_details.owner_name : null,
          'office_details.address': office_details && office_details.address ? office_details.address : null,
          'office_details.city': office_details && office_details.city ? office_details.city : null,
          'office_details.state': office_details && office_details.state ? office_details.state : null,
          'office_details.country': office_details && office_details.country ? office_details.country : null,
          'office_details.pin_code': office_details && office_details.pin_code ? office_details.pin_code : null,
          'office_details.police_station_name': office_details && office_details.police_station_name ? office_details.police_station_name : null,
          'office_details.police_station_address': office_details && office_details.police_station_address ? office_details.police_station_address : null,
        },
      },
      {
        new: true,
      }
    )

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at updateOfficeDetailsByClientId ==> Error : ",error);
  }
}

async function updateOfficeDocumentsByClientId({client_id,key,url}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()

    let fieldVal = "office_details.documents."+key
    let updateData = {}
    updateData[fieldVal] = url

    const mongoClient = await ClientModel.findOneAndUpdate(
      {
        client_id: client_id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      }
    )

    return mongoClient
  }catch(error){
    console.error("Server Error in mongo/client at updateOfficeDocumentsByClientId ==> Error : ",error);
  }
}

module.exports.createMongoClient = createMongoClient;
module.exports.getMongoClientByClientId = getMongoClientByClientId;
module.exports.updateCompanyDetailsByClientId = updateCompanyDetailsByClientId;
module.exports.updateOfficeDetailsByClientId = updateOfficeDetailsByClientId;
module.exports.updateOfficeDocumentsByClientId = updateOfficeDocumentsByClientId;