const LEGAL_MONGO_DB_NAME = process.env.APP_ENV === "prod" ? "legal" :  'legal_staging'
const MONGO_DB_URI = `${process.env.MONGO_URI}/${LEGAL_MONGO_DB_NAME}?retryWrites=true&w=majority`

const DIRECTOR_IMAGE_SLUGS = ["director_image", "director_pan","director_id_proof","director_aadhar_card","director_additional_docs"]
const NOMINEE_IMAGE_SLUGS = ["nominee_image", "nominee_pan","nominee_id_proof","nominee_aadhar_card","nominee_additional_docs","nominee_address_proof"]


module.exports.MONGO_DB_URI = MONGO_DB_URI
module.exports.DIRECTOR_IMAGE_SLUGS = DIRECTOR_IMAGE_SLUGS;
module.exports.NOMINEE_IMAGE_SLUGS = NOMINEE_IMAGE_SLUGS;