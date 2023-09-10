import * as mongoose from "mongoose";
const Schema = mongoose.Schema

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
		isDeleted: {
			type: Boolean,
			default: false
		}
	},
	{
		timestamps: true,
	}
);

export default  mongoose.model("Organization", OrganizationSchema);
