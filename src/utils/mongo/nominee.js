const { generateRandomString } = require("../index")
const NomineeModel = require("../../models/mongo/nominees")
const { connectToMongooseDatabase } = require("./utils")

async function createMultipleNominees({client_id}){
  try{

    let nominees = []
    for (let i = 1; i <= 2; i++) {
      const nominee_id = "NOM" + generateRandomString()
      nominees.push({
        nominee_id : nominee_id,
        client_id : client_id,
        nominee_number : i
      })
    }
    const mongoConnection  = await connectToMongooseDatabase()
    const nomineesData = await NomineeModel.insertMany(nominees)
    return nomineesData
  }catch(error){
    console.error("Server Error in mongo/nominee at createMultipleNominees ==> Error : ",error);
  }
}

async function getNomineesByClientId({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const nomineesData = await NomineeModel.find({client_id : client_id})
    return nomineesData
  }catch(error){
    console.error("Server Error in mongo/nominee at getNomineesByClientId ==> Error : ",error);
  }
}

async function getNomineesByNomineeId({nominee_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const nomineesData = await NomineeModel.findOne({nominee_id : nominee_id})
    return nomineesData
  }catch(error){
    console.error("Server Error in mongo/nominee at getNomineesByNomineeId ==> Error : ",error);
  }
}

async function updateNomineeDetailsByNomineeId({
  nominee_id,
  nominee_name,
  nominee_email,
  nominee_phone,
  current_occupation,
  citizenship,
  nominee_address,
  nominee_city,
  nominee_state,
  nominee_pin_code,
  nominee_country,
  nominee_designation,
}){
  try{

    const mongoConnection  = await connectToMongooseDatabase()
    const updatedData = await NomineeModel.findOneAndUpdate(
      {
        nominee_id: nominee_id,
      },
      {
        $set: {
          nominee_name : nominee_name,
          nominee_email : nominee_email,
          nominee_phone : nominee_phone,
          current_occupation : current_occupation,
          citizenship : citizenship,
          nominee_address : nominee_address,
          nominee_city : nominee_city,
          nominee_state : nominee_state,
          nominee_pin_code : nominee_pin_code,
          nominee_country : nominee_country,
          nominee_designation : nominee_designation
        },
      },
      {
        new: true,
      }
    )

    return updatedData
  }catch(error){
    console.error("Server Error in mongo/nominee at updateNomineeDetailsByNomineeId ==> Error : ",error)
  }
}

async function updateNomineeDocumentsByNomineeId({nominee_id,key,url}){
  try{

    const mongoConnection  = await connectToMongooseDatabase()

    let fieldVal = "documents."+key
    let updateData = {}
    updateData[fieldVal] = url

    const updatedData = await NomineeModel.findOneAndUpdate(
      {
        nominee_id: nominee_id,
      },
      {
        $set: updateData
      },
      {
        new: true,
      }
    )

    return updatedData
  }catch(error){
    console.error("Server Error in mongo/nominee at updateNomineeDocumentsByNomineeId ==> Error : ",error)
  }
}

module.exports.createMultipleNominees = createMultipleNominees;
module.exports.getNomineesByClientId = getNomineesByClientId;
module.exports.getNomineesByNomineeId = getNomineesByNomineeId;
module.exports.updateNomineeDetailsByNomineeId = updateNomineeDetailsByNomineeId
module.exports.updateNomineeDocumentsByNomineeId = updateNomineeDocumentsByNomineeId;