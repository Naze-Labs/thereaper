const { model, Schema } = require("mongoose");
const CardModel = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
    },
    friendlyName: {
      type: String,
      trim: true,
      required: true,
    },
    nameOnCard: {
      type: String,
      trim: true,
      required: true,
    },
    cardNumber: {
      type: Number,
      required: true,
      trim: true,
    },
    expirationYear: {
      type: Number,
      required: true,
      trim: true,
    },
    expirationMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    securityCode: {
      type: Number,
      required: true,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },
    addressLine1: {
      type: String,
      trim: true,
    },
    addressLine2: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    state: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: Number,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("card", CardModel);
