const Organization = require("../../../../models/mongo/organization");

// Add New Organization API
module.exports.addOrganization = async (request, response, next) => {
  try {
    // Get All Request Data
    const {
      organization_id,
      razorpay_api_key,
      razorpay_api_key_secret,
    } = request.body;

    // Check For already Existing Data
    const organizationData = await Organization.findOne({
      organization_id,
      razorpay_api_key,
      razorpay_api_key_secret,
      isDeleted: false,
    });

    // If Organization Details Already exists, throw 409 error
    if (organizationData) {
      return response.status(409).json({
        status: false,
        message: "Organization Details Already Found.",
        data: null,
      });
    }

    // If Organization Details not found then add Organization Details
    const createOrganization = await Client.create({
      organization_id,
      razorpay_api_key,
      razorpay_api_key_secret,
    });

    // Check if Organization Details are added or not
    if (!createOrganization) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Organization Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Organization Details
    return response.json({
      status: true,
      message: "Your details have been added successfully.",
      data: createOrganization,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/organizations at addOrganization ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// Update Organization Details By Id
module.exports.updateOrganizationDetailsById = async (request, response, next) => {
  try {
    // Get All Request Data
    const {
      organization_id,
      razorpay_api_key,
      razorpay_api_key_secret,
    } = request.body;

    // Get ID from Params
    const { id } = request.params;

    //Check for id existence
    const organizationData = await Organization.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!organizationData) {
      return response.status(409).json({
        status: false,
        message: "Organization Details Not Found.",
        data: null,
      });
    }

    const updateData = {
      organization_id,
      razorpay_api_key,
      razorpay_api_key_secret,
    };

    // If Organization Details not found then add Organization Details
    const updateOrganization = await Client.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateData,
      },
      { new: true }
    );

    // Check if Organization Details are updated or not
    if (!updateOrganization) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while updating Organization Details",
        data: null,
      });
    }

    // Return Status true and data after successfully updating Organization Details
    return response.status(200).json({
      status: true,
      message: "Your details have been updated successfully.",
      data: updateOrganization,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/organizations at addOrganization ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// Get Organization Details By Id
module.exports.getOrganizationDetailsById = async (request, response, next) => {
  try {
    const { id } = request.params;

    const organizationData = await Organization.findById(id);

    if (!organizationData) {
      return response.status(400).json({
        status: false,
        message: "Some error while fetching the Organization Details",
        data: null,
      });
    }

    return response.status(200).json({
      status: true,
      message: "Organization Details fetched.",
      data: organizationData,
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};
