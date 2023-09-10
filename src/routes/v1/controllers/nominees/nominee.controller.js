import NomineesModel from "../../../../models/mongo/nominees.js";

// Add New Nominee API
export async function addNominee(request, response, next) {
  try {
    // Get All Request Data
    const {
      client_id,
      nominee_id,
      nominee_number,
      nominee_name,
      nominee_email,
      nominee_phone,
      current_occupation,
      citizenship,
      nominee_address,
      nominee_city,
      nominee_state,
      nominee_pin_code,
      nominee_country,
      nominee_designation,
    } = request.body;


    // If Nominee Details not found then add Nominee Details
    const createNominee = await Client.create({
      client_id,
      nominee_id,
      nominee_number,
      nominee_name,
      nominee_email,
      nominee_phone,
      current_occupation,
      citizenship,
      nominee_address,
      nominee_city,
      nominee_state,
      nominee_pin_code,
      nominee_country,
      nominee_designation,
    });

    // Check if Nominee Details are added or not
    if (!createNominee) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while adding Nominee Details",
        data: null,
      });
    }

    // Return Status true and data after successfully adding Nominee Details
    return response.json({
      status: true,
      message: "Your details have been added successfully.",
      data: createNominee,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/nominees at addNominee ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
}

// Upload Document and update Link in Document Details By Id
export async function updateDocumentLinkById(request, response, next) {
  try {
    // Get All Request Data
    const { documentFor, source } = request.body;

    const { id } = request.params;

    //Check for id existence
    const nomineeData = await NomineesModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!nomineeData) {
      return response.status(409).json({
        status: false,
        message: "Nominee Details Not Found.",
        data: null,
      });
    }

    const fileURL = null;

    if (source) {
      const { documentAttached } = request.files;

      const fileName = `nominee-folder/${new Date().getTime()}${path.extname(
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
    const updateNominee = await Product.findOneAndUpdate(
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
    if (!updateNominee) {
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
      data: updateNominee,
    });
  } catch (e) {
    // Return status 500 if any error occurs
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
}

// Update Nominee Details By Id
export async function updateNomineeDetailsById(request, response, next) {
  try {
    // Get All Request Data
    const {
      client_id,
      nominee_id,
      nominee_number,
      nominee_name,
      nominee_email,
      nominee_phone,
      current_occupation,
      citizenship,
      nominee_address,
      nominee_city,
      nominee_state,
      nominee_pin_code,
      nominee_country,
      nominee_designation,
    } = request.body;

    // Get ID from Params
    const { id } = request.params;

    //Check for id existence
    const nomineeData = await NomineesModel.findOne({
      _id: id,
      isDeleted: false,
    });
    if (!nomineeData) {
      return response.status(409).json({
        status: false,
        message: "Nominee Details Not Found.",
        data: null,
      });
    }

    const updateData = {
      client_id,
      nominee_id,
      nominee_number,
      nominee_name,
      nominee_email,
      nominee_phone,
      current_occupation,
      citizenship,
      nominee_address,
      nominee_city,
      nominee_state,
      nominee_pin_code,
      nominee_country,
      nominee_designation,
    };

    // If Nominee Details not found then add Nominee Details
    const updateNominee = await Client.findByIdAndUpdate(
      { _id: id },
      {
        $set: updateData,
      },
      { new: true }
    );

    // Check if Nominee Details are updated or not
    if (!updateNominee) {
      return response.status(400).json({
        status: false,
        message: "Some error occurred while updating Nominee Details",
        data: null,
      });
    }

    // Return Status true and data after successfully updating Nominee Details
    return response.status(200).json({
      status: true,
      message: "Your details have been updated successfully.",
      data: updateNominee,
    });
  } catch (error) {
    // Return status 500 if any error occurs
    console.error(
      "Server Error in controllers/nominees at addNominee ==> Error : ",
      error
    );
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
}

// Get Nominee Details By Id
export async function getNomineeDetailsById(request, response, next) {
  try {
    const { id } = request.params;

    const nomineeData = await NomineesModel.findById(id);

    if (!nomineeData) {
      return response.status(400).json({
        status: false,
        message: "Some error while fetching the Nominee Details",
        data: null,
      });
    }

    return response.status(200).json({
      status: true,
      message: "Nominee Details fetched.",
      data: nomineeData,
    });
  } catch (e) {
    return response.status(500).json({
      status: false,
      message: "Something went wrong. Please try again",
      data: null,
    });
  }
}
