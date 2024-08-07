const { generateRandomString } = require("../..")
const { getLegalDB, getOrganizationModel } = require("./utils")

async function getOrganizationByOrganizationId({organization_id}){
  try{
    const sequelize = await getLegalDB()
    const OrganizationModel = await getOrganizationModel(sequelize)

    const organization = await OrganizationModel.findOne({
      where : {
        organization_id : organization_id
      },
      raw : true

    })

    return organization
  }catch(error){
    console.error("Server Error at sql/organization in getOrganizationByOrganizationId ==> Error : ",error)
  }
}

async function createOrganization({organization_name}){
  try{
    const sequelize = await getLegalDB()
    const OrganizationModel = await getOrganizationModel(sequelize)

    const organization_id = "ORG" + generateRandomString()

    const organization = await OrganizationModel.create({
      organization_id : organization_id,
      organization_name : organization_name
    })

    return organization
  }catch(error){
    console.error("Server Error at sql/organization in createOrganization ==> Error : ",error)
  }
}

module.exports.createOrganization = createOrganization
module.exports.getOrganizationByOrganizationId = getOrganizationByOrganizationId