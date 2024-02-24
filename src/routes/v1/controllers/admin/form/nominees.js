const { validateAdminAuth } = require("../../../../../middleware/auth.js");
const { getNomineesByNomineeId, updateNomineeDetailsByNomineeId } = require("../../../../../utils/mongo/index.js");
const { getEmployeeByAppwriteId, checkClientBelongsToOrganization } = require("../../../../../utils/sql/legal/index.js");

async function updateNomineeDetailsById(req,res) {
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
