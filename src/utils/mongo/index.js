const { createMongoClient } = require("./client");
const { connectToMongooseDatabase } = require("./utils");

module.exports.connectToMongooseDatabase = connectToMongooseDatabase;

//client exports
module.exports.createMongoClient = createMongoClient;