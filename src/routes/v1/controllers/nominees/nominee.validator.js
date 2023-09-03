/* IMPORT FILE VALIDATION */
const { fileValidation } = require("../../../../utils/helpers/file.validation");

const Joi = require("joi");

// Add Nominee Details Validator to check Request Data
module.exports.addNominee = (request, response, next) => {
  let rules = Joi.object().keys({
    client_id: Joi.string().required(),
    nominee_id: Joi.string(),
    nominee_number: Joi.string(),
    nominee_name: Joi.string(),
    nominee_email: Joi.string(),
    nominee_phone: Joi.string(),
    current_occupation: Joi.string(),
    citizenship: Joi.string(),
    nominee_address: Joi.string(),
    nominee_city: Joi.string(),
    nominee_state: Joi.string(),
    nominee_pin_code: Joi.string(),
    nominee_country: Joi.string(),
    nominee_designation: Joi.string(),
  });

  // Validate request body
  const { error } = rules.validate(request.body);

  if (error) {
    // If any error found return 422 status with error message
    return response
      .status(422)
      .json({ status: false, message: error, data: null });
  } else {
    // If no error found continue next
    return next();
  }
};

module.exports.updateDocumentLinkById = (request, response, next) => {
  let rules = Joi.object().keys({
    documentFor: Joi.string().required(),
  });
  const { error } = rules.validate(request.body);
  if (error) {
    return response
      .status(422)
      .json({ status: false, message: error, data: null });
  } else {
    if (request.files && request.files.documentAttached) {
      const documentSelected = request.files.documentAttached;

      if (
        documentSelected.length == undefined &&
        documentSelected.name.length > 1
      ) {
        const fileValidation = fileValidation(documentSelected);
        if (fileValidation.status === false) {
          return response.status(422).json({
            status: false,
            message: fileValidation.message,
            data: null,
          });
        }
        request.body.source = documentSelected;
      } else {
        return response.status(422).json({
          status: false,
          message: "File not Supported",
          data: null,
        });
      }
    }
  }
};

// Update Nominee Details By Id, Validator to check Request Data
module.exports.updateNomineeDetailsById = (request, response, next) => {
  let rules = Joi.object().keys({
    client_id: Joi.string().required(),
    nominee_id: Joi.string(),
    nominee_number: Joi.string(),
    nominee_name: Joi.string(),
    nominee_email: Joi.string(),
    nominee_phone: Joi.string(),
    current_occupation: Joi.string(),
    citizenship: Joi.string(),
    nominee_address: Joi.string(),
    nominee_city: Joi.string(),
    nominee_state: Joi.string(),
    nominee_pin_code: Joi.string(),
    nominee_country: Joi.string(),
    nominee_designation: Joi.string(),
  });

  // Validate request body
  const { error } = rules.validate(request.body);

  if (error) {
    // If any error found return 422 status with error message
    return response
      .status(422)
      .json({ status: false, message: error, data: null });
  } else {
    // If no error found continue next
    return next();
  }
};
