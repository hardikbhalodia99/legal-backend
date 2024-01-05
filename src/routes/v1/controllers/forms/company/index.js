const { validateAuth } = require("../../../../../middleware/auth.js");
const { uploadPdfToS3Bucket, uploadImageToS3Bucket } = require("../../../../../utils/aws/s3.js");
const { updateCompanyDetailsByClientId, updateOfficeDetailsByClientId, updateOfficeDocumentsByClientId,updateNomineeDocumentsByNomineeId,updateDirectorDocumentByDirectorId } = require("../../../../../utils/mongo/index.js");
const { getClientByAppwriteId } = require("../../../../../utils/sql/legal/client.js");
const {v4:uuidv4} = require("uuid");


async function addCompanyDetails(req,res) {
  console.log("%c 🥟 req", "color:#42b983", req);
	try {
		const { company_details } = req.body;
    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const client = await getClientByAppwriteId({appwrite_id : appwrite_id})
    if(!client){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch client details"
      })
    }

    const companyDetails = await updateCompanyDetailsByClientId({
      client_id : client.client_id,
      company_details : company_details
    })

    if(companyDetails){
      return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
        company_details : companyDetails.company_details,
      })
    }else{
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message : "Failed to update company details"
      })
    }

    
	} catch (error) {
		console.error("Server Error in controllers/client at addCompanyDetails ==> Error : ",error)
		return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
			message: "Server Error! Failed to update company details",
		});
	}
}

async function addOfficeDetails(req,res) {
	try {
		const { office_details } = req.body;
    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const client = await getClientByAppwriteId({appwrite_id : appwrite_id})
    if(!client){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch client details"
      })
    }

    const companyDetails = await updateOfficeDetailsByClientId({
      client_id : client.client_id,
      office_details : office_details
    })

    if(companyDetails){
      return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
        office_details : companyDetails.office_details
      })
    }else{
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message : "Failed to update company details"
      })
    }

    
	} catch (error) {
		console.error("Server Error in controllers/client at addOfficeDetails ==> Error : ",error)
		return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
			message: "Server Error! Failed to update company details",
		});
	}
}

async function uploadDocuments(req,res){
  try {
		
    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const client = await getClientByAppwriteId({appwrite_id : appwrite_id})
    if(!client){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch client details"
      })
    }

    const { image_base64,upload_location, image_slug,content_type,user_id } = req.body;

    let slugs = {
      "company" : ["address_proof_link"],
      "directors" : ["director_residence_proof","director_image","director_pan","director_id_proof","director_aadhar_card","director_additional_docs"],
      "nominees" : ["nominee_image","nominee_pan","nominee_id_proof","nominee_aadhar_card","nominee_additional_docs","nominee_address_proof"],
    }

    let types = ["application/pdf", "image/png", "image/jpg", "image/jpeg"]
    if(!types.includes(content_type)){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Please send appropriate content type"
      })
    }
    
    if(upload_location && slugs[upload_location]){
      if(!slugs[upload_location].includes(image_slug)){
        return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
          message: "Please send appropriate slug"
        }) 
      }
    }else{
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Please send appropriate slug"
      }) 
    }

    if(upload_location === "directors" || upload_location === "nominees"){
      if(!user_id || user_id.trim() === ""){
        return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
          message: "Please send user_id"
        })
      }
    }

    var url = "";
    const uuid = uuidv4();
    let folderName = user_id && user_id.trim() !== "" ?  `${upload_location}/${user_id}` : `${upload_location}`
    if(content_type === "application/pdf"){

      const pdfBuffer = Buffer.from(image_base64.replace(/^data:.+;base64,/, ""),'base64')
      url = await uploadPdfToS3Bucket({
        fileFolder : folderName,
        fileName : image_slug + "-" + uuid,
        client_id : client.client_id,
        organization_id : client.organization_id,
        data : pdfBuffer
      });
          
    }else{
      let splittedType = content_type.split("/")
      let extension = splittedType[splittedType.length-1]
      const imageBuffer = Buffer.from(image_base64.replace(/^data:image\/\w+;base64,/, ""),'base64')
      url = await uploadImageToS3Bucket({
        client_id : client.client_id,
        organization_id : client.organization_id,
        data : imageBuffer,
        fileName : image_slug + "-" + uuid,
        fileExtension : extension,
        folderName : folderName,
        contentType : content_type
      })
    }


    
    
    if(upload_location === "company"){
      await updateOfficeDocumentsByClientId({
        client_id : client.client_id,
        key : image_slug,
        url : url
      })
    }else if(upload_location === "directors"){
      await updateDirectorDocumentByDirectorId({
        director_id : user_id,
        key : image_slug,
        url : url
      })
    }else if(upload_location === "nominees"){
      await updateNomineeDocumentsByNomineeId({
        nominee_id : user_id,
        key : image_slug,
        url : url
      })
    }

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
			message: "Document uploaded successfully",
      url : url
		});

    
	} catch (error) {
		console.error("Server Error in controllers/client at uploadDocuments ==> Error : ",error)
		return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
			message: "Server Error! Failed to upload documents",
		});
	}
}

module.exports.addCompanyDetails = addCompanyDetails;
module.exports.addOfficeDetails = addOfficeDetails;
module.exports.uploadDocuments = uploadDocuments;