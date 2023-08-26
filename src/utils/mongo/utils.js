const mongoose = require("mongoose")

let cachedMongooseDb = null;
async function connectToMongooseDatabase(){
  try{

    if (cachedMongooseDb) {
      console.log("cachedMongooseDb")
      return cachedMongooseDb;
    }
    console.log("Non cachedMongooseDb")
    const db = await mongoose.connect(process.env.MONGO_URI);
    cachedMongooseDb = db;
    return db
  }catch(error){
    console.error("Server Error at utils/mongo/utils in connectToMongooseDatabase ==> Error : ",error);
  }
}

module.exports.connectToMongooseDatabase = connectToMongooseDatabase;