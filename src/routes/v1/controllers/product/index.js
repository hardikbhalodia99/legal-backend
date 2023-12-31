const { getProductByOrganizationIdAndSlug } = require("../../../../utils/sql/legal/product.js")

async function getOrganizationProductDetailsById(request, response, next){
  try {
    const { organization_id,slug } = request.params;

    if(!organization_id || !slug){
      return response.status(400).set({"Access-Control-Allow-Origin" : "*"}).json({
        message : "Please send organization_id  and slug in your request"
      })
    }

    let responseData


    if(slug === "pvt-ltd"){
      responseData = await getPvtLtdAllProductDetails({organization_id : organization_id})
    }else if(slug === "opc"){
      responseData = await getOPCAllProductDetails({organization_id : organization_id})
    }else if(slug === "llp"){
      responseData = await getLLPAllProductDetails({organization_id : organization_id})
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
    product_slug : "pvt-directors"
  })

  if(additionalDirectorProduct) {
    responseData['pvt-directors'] = additionalDirectorProduct
  }

  return responseData
}

async function getOPCAllProductDetails({organization_id}){
  let responseData = {}

  const opcProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "opc"
  })

  if(opcProduct) {
    responseData['opc'] = opcProduct
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
    product_slug : "opc-directors"
  })

  if(additionalDirectorProduct) {
    responseData['opc-directors'] = additionalDirectorProduct
  }

  return responseData
}

async function getLLPAllProductDetails({organization_id}){
  let responseData = {}

  const llpProduct = await getProductByOrganizationIdAndSlug({
    organization_id : organization_id,
    product_slug : "llp"
  })

  if(llpProduct) {
    responseData['llp'] = llpProduct
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
    product_slug : "llp-directors"
  })

  if(additionalDirectorProduct) {
    responseData['llp-directors'] = additionalDirectorProduct
  }

  return responseData
}

module.exports.getOrganizationProductDetailsById = getOrganizationProductDetailsById;