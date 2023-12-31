const { validateAuth } = require("../../../../../middleware/auth.js");
const { getNomineesByNomineeId, updateNomineeDetailsByNomineeId } = require("../../../../../utils/mongo/index.js");
const { getClientByAppwriteId } = require("../../../../../utils/sql/legal/client.js");

async function updateNomineeDetailsById(req,res) {
  try {
    const validationResponse = await validateAuth(req,res)
    if (!validationResponse.isValid) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to authenticate bearer token.",
      })
    }
    const appwrite_id = validationResponse.data.$id
    if (!appwrite_id) {
      return res.status(403).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Auth Error: Partner not found"
      })
    }

    const client = await getClientByAppwriteId({appwrite_id : appwrite_id})
    if(!client){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch client details"
      })
    }

    const {
      nominee_id,
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
    } = req.body;

   
    const nomineeData = await getNomineesByNomineeId({
      nominee_id : nominee_id
    })
    if (!nomineeData) {
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Nominee Details Not Found.",
      });
    }

    const updateData = {
      nominee_id,
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

    const updatedNominee = await updateNomineeDetailsByNomineeId(updateData)

    if (!updatedNominee) {
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to update nominee details",
      });
    }

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Your details have been updated successfully.",
      data: updatedNominee,
    });
  } catch (error) {
    console.error("Server Error in controllers/nominees at addNominee ==> Error : ",error);
    return res.status(500).json({
      status: false,
      message: "Something went wrong. Please try again.",
      data: null,
    });
  }
}

module.exports.updateNomineeDetailsById = updateNomineeDetailsById;
