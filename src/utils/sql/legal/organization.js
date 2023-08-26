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

module.exports.getOrganizationByOrganizationId = getOrganizationByOrganizationId;