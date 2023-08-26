const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrganizationSchema = new Schema(
	{
		organization_id: {
			type: String,
			required: true,
		},
		razorpay_api_key: {
			type: String,
		},
		razorpay_api_key_secret: {
			type: String,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);
