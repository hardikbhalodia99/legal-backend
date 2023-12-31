const { createMongoClient, getMongoClientByClientId, updateCompanyDetailsByClientId,updateOfficeDetailsByClientId,updateOfficeDocumentsByClientId } = require("./client");
const { createMultipleDirectors, updateDirectorDetailsByDirectorId,getDirectorsByClientId,getDirectorByDirectorId,updateDirectorDocumentByDirectorId } = require("./director");
const { createMongoForm, getMongoFormByFormId } = require("./form");
const { createMultipleNominees,getNomineesByClientId,getNomineesByNomineeId, updateNomineeDetailsByNomineeId,updateNomineeDocumentsByNomineeId } = require("./nominee");
const { getMongoOrgByOrgId, createMongoOrganization } = require("./organization");
const { connectToMongooseDatabase } = require("./utils");


//client exports
module.exports.createMongoClient = createMongoClient;
module.exports.getMongoClientByClientId = getMongoClientByClientId;
module.exports.updateCompanyDetailsByClientId = updateCompanyDetailsByClientId;
module.exports.updateOfficeDetailsByClientId = updateOfficeDetailsByClientId;
module.exports.updateOfficeDocumentsByClientId = updateOfficeDocumentsByClientId;

//organization exports
module.exports.createMongoOrganization = createMongoOrganization;
module.exports.getMongoOrgByOrgId = getMongoOrgByOrgId;

//utils exports
module.exports.connectToMongooseDatabase = connectToMongooseDatabase;

//form exports
module.exports.createMongoForm = createMongoForm;
module.exports.getMongoFormByFormId = getMongoFormByFormId;


//director exports
module.exports.createMultipleDirectors = createMultipleDirectors;
module.exports.updateDirectorDetailsByDirectorId = updateDirectorDetailsByDirectorId;
module.exports.getDirectorsByClientId = getDirectorsByClientId;
module.exports.getDirectorByDirectorId = getDirectorByDirectorId;
module.exports.updateDirectorDocumentByDirectorId = updateDirectorDocumentByDirectorId;

//nominee exports
module.exports.createMultipleNominees = createMultipleNominees;
module.exports.getNomineesByClientId = getNomineesByClientId;
module.exports.getNomineesByNomineeId = getNomineesByNomineeId;
module.exports.updateNomineeDetailsByNomineeId = updateNomineeDetailsByNomineeId;
module.exports.updateNomineeDocumentsByNomineeId = updateNomineeDocumentsByNomineeId;