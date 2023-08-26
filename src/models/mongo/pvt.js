const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PvtSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
    company_details : {
      company_email : { type : String },
      company_name_priority_1 : { type : String},
      company_name_priority_2 : { type : String},
      company_name_priority_3 : { type : String},
      company_name_priority_4 : { type : String},
      company_objective : { type : String}
    },
    office_details : {
      owner_name  : { type : String},
      office_address : { type : String},
      city : { type : String},
      state : { type : String},
      country : { type : String},
      pincode : { type : String},

    },

    form_filled : {type : Boolean , defaultValue : false}
			
		
		
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models.Pvt || mongoose.model("Pvt", PvtSchema);
