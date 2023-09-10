import { getProductByOrganizationIdAndSlug } from "../../../../utils/sql/legal/product.js";


export async function getOrganizationProductDetailsById(request, response, next){
  try {
    const { organization_id,product_slug } = request.params;

    if(!organization_id || !product_slug){
      return response.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "Please send organization_id  and product_slug in your request"
      })
    }

    let responseData


    if(product_slug === "pvt-ltd"){
      responseData = await getPvtLtdAllProductDetails({organization_id : organization_id})
    }

    return response.status(200).set({"Access-Control-Allow-Origin" : "*"}).json({
      product_data : responseData,
    });
  } catch (error) {
    console.error("Server Error in controllers/organization/index at getOrganizationProductDetailsById ==> Error : ",error)
    return response.status(500).set({"Access-Control-Allow-Origin" : "*"}).json({
      message: "Server Error! Failed to get product details",
    });
  }
};

async function getPvtLtdAllProductDetails({organization_id}){
  let responseData = {}

  const pvtProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "pvt-ltd"
  })

  if(pvtProduct) {
    responseData['pvt-ltd'] = pvtProduct
  }

  const gstProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "gst"
  })

  if(gstProduct) {
    responseData['gst'] = gstProduct
  }

  const rocProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "roc"
  })

  if(rocProduct) {
    responseData['roc'] = rocProduct
  }

  const msmeProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "msme"
  })

  if(msmeProduct) {
    responseData['msme'] = msmeProduct
  }

  const additionalDirectorProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "pvt-director"
  })

  if(additionalDirectorProduct) {
    responseData['pvt-director'] = additionalDirectorProduct
  }

  return responseData
}

