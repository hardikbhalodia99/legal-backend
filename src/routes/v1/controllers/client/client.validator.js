const Joi = require("joi");

// Add Company Details Validator to check Request Data
module.exports.addCompanyDetails = (request, response, next) => {
  let rules = Joi.object().keys({
    company_email: Joi.string().required(),
    company_name_priority_1: Joi.string().required,
    company_name_priority_2: Joi.string().required,
    company_name_priority_3: Joi.string(),
    company_name_priority_4: Joi.string(),
    company_objective: Joi.string(),
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
// Add Office Details Validator to check Request Data
module.exports.updateOfficeDetailsById = (request, response, next) => {
  let rules = Joi.object().keys({
    owner_name: Joi.string().required(),
    address: Joi.string().required,
    city: Joi.string().required,
    state: Joi.string().required,
    country: Joi.string().required,
    pin_code: Joi.string().required,
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
// Add Director Details Validator to check Request Data
module.exports.updateDirectorDetailsById = (request, response, next) => {
  let rules = Joi.object().keys({
    name: Joi.string().required(),
    director_id: Joi.string().required,
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
// Add Nominee Details Validator to check Request Data
module.exports.updateNomineeDetailsById = (request, response, next) => {
  let rules = Joi.object().keys({
    name: Joi.string().required(),
    nominee_id: Joi.string().required,
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
