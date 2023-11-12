const LEGAL_MONGO_DB_NAME = process.env.APP_ENV === "prod" ? "legal" :  'legal_staging'
const MONGO_DB_URI = `${process.env.MONGO_URI}/${LEGAL_MONGO_DB_NAME}?retryWrites=true&w=majority`


module.exports.MONGO_DB_URI = MONGO_DB_URI