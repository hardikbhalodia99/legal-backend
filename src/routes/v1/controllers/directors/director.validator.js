/* IMPORT FILE VALIDATION */
const { fileValidation } = require("../../../../utils/helpers/file.validation");

const Joi = require("joi");

// Add Company Details Validator to check Request Data
module.exports.addDirector = (request, response, next) => {
  let rules = Joi.object().keys({
    client_id: Joi.string().required(),
    director_id: Joi.string(),
    director_number: Joi.string(),
    director_name: Joi.string(),
    director_email: Joi.string(),
    director_phone: Joi.string(),
    director_sharing_ratio: Joi.string(),
    director_contribution: Joi.string(),
    current_occupation: Joi.string(),
    citizenship: Joi.string(),
    din_number: Joi.string(),
    duration_of_stay_number: Joi.string(),
    duration_of_stay_type: Joi.string(),
    director_address: Joi.string(),
    director_city: Joi.string(),
    director_state: Joi.string(),
    director_pin_code: Joi.string(),
    director_country: Joi.string(),
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
