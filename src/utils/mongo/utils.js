import { connect } from "mongoose";
import { MONGO_DB_URI } from "../constants/index.js";

let cachedMongooseDb = null;
export async function connectToMongooseDatabase(){
  try{

    if (cachedMongooseDb) {
      console.log("cachedMongooseDb")
      return cachedMongooseDb;
    }
    console.log("Non cachedMongooseDb")
    const db = await connect(MONGO_DB_URI);
    cachedMongooseDb = db;
    return db
  }catch(error){
    console.error("Server Error at utils/mongo/utils in connectToMongooseDatabase ==> Error : ",error);
  }
}

