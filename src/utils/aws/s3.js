async function uploadToS3Bucket({orgnaization_id ,client_id,fileName,folderName,fileExtension,data}){
  try {
    const params = {
      Bucket: 'legal-user-files',
      Key: process.env.APP_ENV + "/" +orgnaization_id + "/" + client_id + "/" + folderName + '/' + fileName + "." + fileExtension,
      Body: data,
      ACL:'public-read',
      ContentType : 'application/json'
    };
      const stored = await s3.upload(params).promise()
      console.log(stored);
      return stored['Location'];
    } catch (error) {
      console.error("Server Error at utils/aws/s3 in uploadToS3Bucket ==> Error : ",error)
    }
}

module.exports.uploadToS3Bucket = uploadToS3Bucket;