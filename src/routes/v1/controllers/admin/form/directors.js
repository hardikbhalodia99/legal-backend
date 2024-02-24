const { validateAdminAuth } = require("../../../../../middleware/auth");
const { getDirectorByDirectorId, updateDirectorDetailsByDirectorId } = require("../../../../../utils/mongo");
const { getEmployeeByAppwriteId, checkClientBelongsToOrganization } = require("../../../../../utils/sql/legal");


async function updateDirectorDetailsById(req, res) {
  try {

    const validationResponse = await validateAdminAuth(req,res)
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

    const employee = await getEmployeeByAppwriteId({appwrite_id : appwrite_id})
    if(!employee){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "Failed to fetch employee details"
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
      client_id
    } = req.body;

    const companyMatches = await checkClientBelongsToOrganization({
      client_id : client_id,
      organization_id : employee.organization_id
    })

    if(!companyMatches){
      return res.status(400).set({"Access-Control-Allow-Origin": "*"}).json({
        message: "You are not authorized to view this company details"
      })
    }

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
