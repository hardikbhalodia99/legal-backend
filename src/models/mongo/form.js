const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FormSchema = new Schema(
	{
		
		client_name: { type: String, required: true },
		client_email: { type: String, required: true },
		client_phone: { type: String, required: true },
		organization_id: { type: String, required: true },
		order_amount: { type: Number, required: true },
		products: [
			{
				product_slug: { type: String, required: true },
				quantity: { type: Number, required: true },
			},
		],
		isDeleted: {
			type: Boolean,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Form", FormSchema);
