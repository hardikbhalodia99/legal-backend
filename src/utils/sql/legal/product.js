import { generateRandomString } from "../../index.js"
import { getProductModel } from "./utils.js"
import { getLegalDB } from "./utils.js"

export async function getProductByOrganizationIdAndSlug({organization_id,product_slug}){
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

export async function createProduct({organization_id,product_name,product_slug,product_discount,product_price}){
  try{
    const sequelize = await getLegalDB()
    const ProductsModel = await getProductModel(sequelize)
    
    const product_id = "SKU" + generateRandomString()

    const product = await ProductsModel.create({
      product_id : product_id,
      organization_id : organization_id,
      product_name : product_name,
      product_discount : product_discount,
      product_price : product_price,
      product_slug : product_slug,
    })

    return product

  }catch(error){
    console.error("Server Error in sql/legal/product in createProduct ==> Error : ",error)
  }
}
