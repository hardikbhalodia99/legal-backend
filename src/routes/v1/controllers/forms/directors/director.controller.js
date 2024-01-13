const { validateUserAuth } = require("../../../../../middleware/auth");
const { getDirectorByDirectorId, updateDirectorDetailsByDirectorId } = require("../../../../../utils/mongo");
const { getClientByAppwriteId } = require("../../../../../utils/sql/legal");


async function updateDirectorDetailsById(req, res) {
  try {

    const validationResponse = await validateUserAuth(req,res)
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
    } = req.body;

    const directorData = await getDirectorByDirectorId({
      director_id : director_id
    })
    if (!directorData) {
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Director Details Not Found.",
      });
    }

    const updateData = {
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

    const updateDirector = await updateDirectorDetailsByDirectorId(updateData)

    if (!updateDirector) {
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to update Director Details",
      });
    }

    return res.status(200).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Your details have been updated successfully.",
      data: updateDirector,
    });
  } catch (error) {
    console.error("Server Error in controllers/directors at updateDirectorDetailsById ==> Error : ", error);
    return res.status(500).set({"Access-Control-Allow-Origin": "*"}).json({
      message: "Server Error! Failed to update director details.",
    });
  }
}

module.exports.updateDirectorDetailsById = updateDirectorDetailsById;
