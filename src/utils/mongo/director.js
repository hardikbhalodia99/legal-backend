const { connectToMongooseDatabase } = require("./utils");
const DirectorModel = require("../../models/mongo/directors");
const { generateRandomString } = require("..");


async function updateDirectorDetailsByDirectorId({director_id,
  director_name,
  director_email,
  director_phone,
  director_sharing_ratio,
  director_contribution,
  current_occupation,
  citizenship,
  din_number,
  duration_of_stay_number,
  duration_of_stay_type,
  director_address,
  director_city,
  director_state,
  director_pin_code,
  director_country
}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const directorData = await DirectorModel.findOneAndUpdate(
      {
        director_id: director_id,
      },
      {
        $set: {
          director_name : director_name,
          director_email : director_email,
          director_phone : director_phone,
          director_sharing_ratio  :director_sharing_ratio,
          director_contribution : director_contribution,
          current_occupation : current_occupation,
          citizenship : citizenship,
          din_number : din_number,
          duration_of_stay_number : duration_of_stay_number,
          duration_of_stay_type : duration_of_stay_type,
          director_address : director_address,
          director_city : director_city,
          director_state : director_state,
          director_pin_code : director_pin_code,
          director_country : director_country
        },
      },
      {
        new: true,
      }
    )

    return directorData
  }catch(error){
    console.error("Server Error in mongo/client at updateDirectorDetailsByDirectorId ==> Error : ",error);
  }
}

async function createMultipleDirectors({client_id,total_directors,begin_with}){
  try{

    let directors = []
    for (let i = begin_with; i < begin_with+total_directors; i++) {
      const director_id = "DIR" + generateRandomString()
      directors.push({
        director_id : director_id,
        client_id : client_id,
        director_number : i
      })
    }

    const mongoConnection  = await connectToMongooseDatabase()
    const directorsData = await DirectorModel.insertMany(directors)
    return directorsData
  }catch(error){
    console.error("Server Error in mongo/director at createMultipleDirectors ==> Error : ",error);
  }
}

async function getDirectorsByClientId({client_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const directorsData = await DirectorModel.find({
      client_id : client_id
    })
    return directorsData
  }catch(error){
    console.error("Server Error in mongo/director at getDirectorsByClientId ==> Error : ",error);
  }
}

async function getDirectorByDirectorId({director_id}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()
    const directorsData = await DirectorModel.findOne({
      director_id : director_id
    })
    return directorsData
  }catch(error){
    console.error("Server Error in mongo/director at getDirectorByDirectorId ==> Error : ",error);
  }
}

async function updateDirectorDocumentByDirectorId({director_id,url,key}){
  try{
    const mongoConnection  = await connectToMongooseDatabase()

    let fieldVal = "documents."+key
    let updateData = {}
    updateData[fieldVal] = url

    const directorData = await DirectorModel.findOneAndUpdate(
      {
        director_id: director_id,
      },
      {
        $set: updateData,
      },
      {
        new: true,
      }
    )

    return directorData
  }catch(error){
    console.error("Server Error in mongo/client at updateDirectorDocumentByDirectorId ==> Error : ",error);
  }
}

module.exports.createMultipleDirectors = createMultipleDirectors;
module.exports.updateDirectorDetailsByDirectorId = updateDirectorDetailsByDirectorId;
module.exports.getDirectorsByClientId = getDirectorsByClientId;
module.exports.getDirectorByDirectorId = getDirectorByDirectorId;
module.exports.updateDirectorDocumentByDirectorId = updateDirectorDocumentByDirectorId;