const { model, Schema } = require("mongoose");
const AddressModel = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
    },

    firstName: {
      type: String,
      trim: true,
      required: true,
    },

    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine2: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: Number,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      require: true,
    },
    phone: {
      type: String,
      trim: true,
      require: true,
    },
  },
  { timestamps: true }
);

module.exports = model("address", AddressModel);