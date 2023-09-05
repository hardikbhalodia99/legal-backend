const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DirectorSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
		director_id: { type: String },
		director_number: { type: Number },
		director_name: { type: String },
		director_email: { type: String },
		director_phone: { type: String },
		director_sharing_ratio: { type: Number },
		director_contribution: { type: Number },
		current_occupation: { type: String },
		citizenship: { type: Number },
		din_number: { type: String },
		duration_of_stay_number: { type: Number },
		duration_of_stay_type: { type: String },
		director_address: { type: String },
		director_city: { type: String },
		director_state: { type: String },
		director_pin_code: { type: String },
		director_country: { type: String },
		documents: {
			director_image: { type: String },
			director_pan: { type: String },
			director_id_proof: { type: String },
			director_aadhar_card: { type: String },
			director_additional_docs: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.Director || mongoose.model("Director", DirectorSchema);
