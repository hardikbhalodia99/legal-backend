const { generateRandomString } = require("../..")
const { getLegalDB, getClientModel } = require("./utils")

async function getClientByClientId({client_id}){
  try{
    const sequelize = await getLegalDB()
    const ClientModel = await getClientModel(sequelize)

    const client = await ClientModel.findOne({
      where : {
        client_id : client_id
      },
      raw : true

    })

    return client
  }catch(error){
    console.error("Server Error at sql/client in getClientByClientId ==> Error : ",error)
  }
}

async function getClientByAppwriteId({appwrite_id}){
  try{
    const sequelize = await getLegalDB()
    const ClientModel = await getClientModel(sequelize)

    const client = await ClientModel.findOne({
      where : {
        appwrite_id : appwrite_id
      },
      raw : true

    })

    return client
  }catch(error){
    console.error("Server Error at sql/client in getClientByClientId ==> Error : ",error)
  }
}

async function createSQLClient({client_name,client_email,appwrite_id,organization_id}){
  try{
    const sequelize = await getLegalDB()
    const ClientModel = await getClientModel(sequelize)

    const client_id = "CLI" + generateRandomString()

    const client = await ClientModel.create({
      client_id : client_id,
      client_name : client_name,
      client_email : client_email,
      appwrite_id : appwrite_id,
      organization_id : organization_id
    })

    return client
  }catch(error){
    console.error("Server Error at sql/client in createSQLClient ==> Error : ",error)
  }
}

module.exports.createSQLClient = createSQLClient
module.exports.getClientByClientId = getClientByClientId
module.exports.getClientByAppwriteId = getClientByAppwriteId;