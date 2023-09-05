const Director = require("../../../../models/mongo/directors");

// Add New Director API
module.exports.addDirector = async (request, response, next) => {
  try {
    // Get All Request Data
    const {
      client_id,
      director_id,
      director_number,
      director_name,
      director_email,
      director_phone,
      director_sharing_ratio,
      director_contribution,
      current_occupation,
      citizenship,
      din_number,
      duration_of_stay_number,
      duration_of_stay_type,
      director_address,
      director_city,
      director_state,
      director_pin_code,
      director_country,
    } = request.body;

    // Check For already Existing Data
    const directorData = await Director.findOne({
      client_id,
      director_id,
      director_name,
      isDeleted: false,
    });

    // If Director Details Already exists, throw 409 error
    if (directorData) {
      return response.status(409).json({
        status: false,
        message: "Director Details Already Found.",
        data: null,
      });
    }

    // If Director Details not found then add Director Details
    const createDirector = await Client.create({
      client_id,
      director_id,
      director_number,
      director_name,
      director_email,
      director_phone,
      director_sharing_ratio,
      director_contribution,
      current_occupation,
      citizenship,
      din_number,
      duration_of_stay_number,
      duration_of_stay_type,
      director_address,
      director_city,
      director_state,
      director_pin_code,
      director_country,
    });

    // Check if Director Details are added or not
    if (!createDirector) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Director Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Director Details
    return response.json({
      status: true,
      message: "Your details have been added successfully.",
      data: createDirector,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/directors at addDirector ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// Upload Document and update Link in Document Details By Id
module.exports.updateDocumentLinkById = async (request, response, next) => {
  try {
    // Get All Request Data
    const { documentFor, source } = request.body;

    const { id } = request.params;

    //Check for id existence
    const directorData = await Director.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!directorData) {
      return response.status(409).json({
        status: false,
        message: "Director Details Not Found.",
        data: null,
      });
    }

    const fileURL = null;

    if (source) {
      const { documentAttached } = request.files;

      const fileName = `director-folder/${new Date().getTime()}${path.extname(
        documentAttached.name
      )}`;

      const Uploaded = await uploadFileToAWS(fileName, documentAttached);

      if (Uploaded === false) {
        return response.status(400).json({
          status: false,
          message: "Some error occurred while updating the image",
          data: null,
        });
      }
      fileURL = fileName;
    }

    // If Id found then add Nominee Details
    const updateDirector = await Product.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $set: {
          [`documents.${documentFor}`]: fileURL,
        },
      },
      {
        new: true,
      }
    );

    // Check if Document Links Details is added or not
    if (!updateDirector) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Document Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Document Details
    return response.status(200).json({
      status: true,
      message: "Your details have been added successfully.",
      data: updateDirector,
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

// Update Director Details By Id
module.exports.updateDirectorDetailsById = async (request, response, next) => {
  try {
    // Get All Request Data
    const {
      client_id,
      director_id,
      director_number,
      director_name,
      director_email,
      director_phone,
      director_sharing_ratio,
      director_contribution,
      current_occupation,
      citizenship,
      din_number,
      duration_of_stay_number,
      duration_of_stay_type,
      director_address,
      director_city,
      director_state,
      director_pin_code,
      director_country,
    } = request.body;

    // Get ID from Params
    const { id } = request.params;

    //Check for id existence
    const directorData = await Director.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!directorData) {
      return response.status(409).json({
        status: false,
        message: "Director Details Not Found.",
        data: null,
      });
    }

    const updateData = {
      client_id,
      director_id,
      director_number,
      director_name,
      director_email,
      director_phone,
      director_sharing_ratio,
      director_contribution,
      current_occupation,
      citizenship,
      din_number,
      duration_of_stay_number,
      duration_of_stay_type,
      director_address,
      director_city,
      director_state,
      director_pin_code,
      director_country,
    };

    // If Director Details not found then add Director Details
    const updateDirector = await Client.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateData,
      },
      { new: true }
    );

    // Check if Director Details are updated or not
    if (!updateDirector) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while updating Director Details",
        data: null,
      });
    }

    // Return Status true and data after successfully updating Director Details
    return response.status(200).json({
      status: true,
      message: "Your details have been updated successfully.",
      data: updateDirector,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/directors at addDirector ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
};

// Get Director Details By Id
module.exports.getDirectorDetailsById = async (request, response, next) => {
  try {
    const { id } = request.params;

    const directorData = await Director.findById(id);

    if (!directorData) {
      return response.status(400).json({
        status: false,
        message: "Some error while fetching the Director Details",
        data: null,
      });
    }

    return response.status(200).json({
      status: true,
      message: "Director Details fetched.",
      data: directorData,
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
};
