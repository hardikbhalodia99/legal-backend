/* IMPORT FILE VALIDATION */
const { fileValidation } = require("../../../../utils/helpers/file.validation");

const Joi = require("joi");

// Add Organization Details Validator to check Request Data
module.exports.addOrganization = (request, response, next) => {
  let rules = Joi.object().keys({
    client_id: Joi.string().required(),
    organization_id: Joi.string(),
    organization_number: Joi.string(),
    organization_name: Joi.string(),
    organization_email: Joi.string(),
    organization_phone: Joi.string(),
    current_occupation: Joi.string(),
    citizenship: Joi.string(),
    organization_address: Joi.string(),
    organization_city: Joi.string(),
    organization_state: Joi.string(),
    organization_pin_code: Joi.string(),
    organization_country: Joi.string(),
    organization_designation: Joi.string(),
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

// Update Organization Details By Id, Validator to check Request Data
module.exports.updateOrganizationDetailsById = (request, response, next) => {
  let rules = Joi.object().keys({
    client_id: Joi.string().required(),
    organization_id: Joi.string(),
    organization_number: Joi.string(),
    organization_name: Joi.string(),
    organization_email: Joi.string(),
    organization_phone: Joi.string(),
    current_occupation: Joi.string(),
    citizenship: Joi.string(),
    organization_address: Joi.string(),
    organization_city: Joi.string(),
    organization_state: Joi.string(),
    organization_pin_code: Joi.string(),
    organization_country: Joi.string(),
    organization_designation: Joi.string(),
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
