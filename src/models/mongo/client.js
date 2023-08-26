const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ClientSchema = new Schema(
	{
		client_id: {
			type: String,
			required: true,
		},
		
		
	},
	{
		timestamps: true,
	}
);

module.exports =
	mongoose.models.Client || mongoose.model("Client", ClientSchema);
