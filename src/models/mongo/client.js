const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
		form_filled: { type: Boolean, defaultValue: false },
	
		company_details: {
			company_email: { type: String },
			company_name_priority_1: { type: String },
			company_name_priority_2: { type: String },
			company_name_priority_3: { type: String },
			company_name_priority_4: { type: String },
			company_objective: { type: String },
		},
		office_details: {
			owner_name: { type: String },
			address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			pin_code: { type: String },
			police_station_name : {type : String},
			police_station_address : {type : String},
			documents : {
				address_proof_link : {type : String}
			}
		},
		invoice_details : {
			invoice_to_name : {type : String},
			address_1,
			address_2,
			address_3,
			gst_number
		},
	
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Client", ClientSchema);
