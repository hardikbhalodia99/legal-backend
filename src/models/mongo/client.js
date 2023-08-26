const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
		form_filled: { type: Boolean, defaultValue: false },
		director_information: {
			total_directors: {
				type: Number,
			},
			director_1: { type: String },
			director_2: { type: String },
			director_3: { type: String },
			director_4: { type: String },
		},
		nominee_information: {
			nominee_1: { type: String },
			nominee_2: { type: String },
		},
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
			office_address: { type: String },
			city: { type: String },
			state: { type: String },
			country: { type: String },
			pincode: { type: String },
		},
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.Client || mongoose.model("Client", ClientSchema);
