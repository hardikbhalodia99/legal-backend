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
      }
    },
    company_details: {
      company_email: { type: String, required: true },
      company_name_priority_1: { type: String },
      company_name_priority_2: { type: String },
      company_name_priority_3: { type: String },
      company_name_priority_4: { type: String },
      company_objective: { type: String, required: true },
    },
    office_details: {
      owner_name: { type: String },
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      pin_code: { type: String },
    },
    status: {
      type: Number,
      default: 1,
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

module.exports =
  mongoose.models.Client || mongoose.model("Client", ClientSchema);
