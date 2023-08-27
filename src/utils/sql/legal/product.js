const { getProductModel } = require("./utils")
const { getLegalDB } = require("./utils")

async function getProductByOrganizationIdAndSlug({organization_id,product_slug}){
  try{
    const sequelize = await getLegalDB()
    const ProductsModel = await getProductModel(sequelize)

    const product = await ProductsModel.findOne({
      where : {
        organization_id : organization_id,
        product_slug : product_slug,
        is_deleted : false
      }
    })

    return product

  }catch(error){
    console.error("Server Error in sql/legal/product in getProductByOrganizationIdAndSlug ==> Error : ",error)
  }
}

module.exports.getProductByOrganizationIdAndSlug = getProductByOrganizationIdAndSlug;