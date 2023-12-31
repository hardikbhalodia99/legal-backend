let AWS = require('aws-sdk');
const s3 = new AWS.S3();

async function uploadImageToS3Bucket({organization_id ,client_id,fileName,folderName,fileExtension,data,contentType}){
  try {
    const params = {
      Bucket: 'legal-user-files',
      Key: process.env.APP_ENV + "/" +organization_id + "/" + client_id + "/" + folderName + '/' + fileName + "." + fileExtension,
      Body: data,
      ACL:'public-read',
      ContentType : contentType ? contentType : 'image/png'
    };
      const stored = await s3.upload(params).promise()
      console.log("%c 🍬 stored", "color:#42b983", stored);
      return stored['Location'];
    } catch (error) {
      console.error("Server Error at utils/aws/s3 in uploadToS3Bucket ==> Error : ",error)
    }
}

async function uploadPdfToS3Bucket({organization_id ,client_id,fileFolder,fileName,data}){
  try {

    const params = {
      Bucket: 'legal-user-files',
      Key:  process.env.APP_ENV + "/" +organization_id + "/" + client_id + "/" + fileFolder + "/" + fileName + ".pdf",
      Body: data,
      ACL:'public-read',
      ContentType : 'application/pdf'
    };

    const stored = await s3.upload(params).promise()
    console.log('%c 🍗 stored: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', stored);
    return stored['Location'];
  } catch (error) {
    console.error("Server Error at utils/aws/s3 in uploadPdfToS3Bucket ==> Error : ",error)
  }
}

module.exports.uploadImageToS3Bucket = uploadImageToS3Bucket;
module.exports.uploadPdfToS3Bucket = uploadPdfToS3Bucket;