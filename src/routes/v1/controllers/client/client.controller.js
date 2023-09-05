const Client = require("../../../../models/mongo/client");

// Add New Client API
module.exports.addCompanyDetails = async (request, response, next) => {
  try {
    // Get All Request Data
    const {
      company_email,
      company_name_priority_1,
      company_name_priority_2,
      company_name_priority_3,
      company_name_priority_4,
      company_objective,
    } = request.body;

    // Check For already Existing Data
    const clientData = await Client.findOne({
      company_details: {
        company_email,
        company_name_priority_1,
        company_name_priority_2,
        company_name_priority_3,
        company_name_priority_4,
        company_objective,
      },
      isDeleted: false,
    });

    // If Company Details Already exists, throw 409 error
    if (clientData) {
      return response.status(409).json({
        status: false,
        message: "Client Details Already Found.",
        data: null,
      });
    }

    // If Company Details not found then add Client Company Details
    const createClient = await Client.create({
      company_details: {
        company_email,
        company_name_priority_1,
        company_name_priority_2,
        company_name_priority_3,
        company_name_priority_4,
        company_objective,
      },
    });

    // Check if Company Details are added or not
    if (!createClient) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Client Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Company Details
    return response.json({
      status: true,
      message: "Your details have been added successfully.",
      data: createClient,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error("Server Error in controllers/client at addCompanyDetails ==> Error : ",error)
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// Add Office Details to Client Id
module.exports.updateOfficeDetailsById = async (request, response, next) => {
  try {
    // Get All Request Data
    const { owner_name, address, city, state, country, pin_code } =
      request.body;

    const { id } = request.params;

    //Check for id existence
    if (!id) {
      return response.status(409).json({
        status: false,
        message: "Client Details Not Found.",
        data: null,
      });
    }

    // Create Variable to save append data
    const updateData = {
      office_details: {
        owner_name,
        address,
        city,
        state,
        country,
        pin_code,
      },
    };

    // If Id found then add Office Details
    const updateClient = await Client.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: updateData,
      },
      { new: true }
    );

    // Check if Office Details are added or not
    if (!updateClient) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Office Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Office Details
    return response.status(200).json({
      status: true,
      message: "Your details have been added successfully.",
      data: createClient,
    });
  } catch (e) {
    // Return status 500 if any error occurs
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};