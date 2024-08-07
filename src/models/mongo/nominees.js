const mongoose = require("mongoose");
const Schema = mongoose.Schema

const NomineeSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
		nominee_id: { type: String },
		nominee_number: { type: Number },
		nominee_name: { type: String },
		nominee_email: { type: String },
		nominee_phone: { type: String },
		current_occupation: { type: String },
		citizenship: { type: String },
		nominee_address: { type: String },
		nominee_city: { type: String },
		nominee_state: { type: String },
		nominee_pin_code: { type: String },
		nominee_country: { type: String },
		nominee_designation: { type: String },
		documents: {
			nominee_image: { type: String },
			nominee_pan: { type: String },
			nominee_id_proof: { type: String },
			nominee_aadhar_card: { type: String },
			nominee_address_proof: { type: String },
			nominee_additional_docs: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Nominee", NomineeSchema);