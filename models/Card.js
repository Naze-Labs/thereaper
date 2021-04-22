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
  },
  { timestamps: true }
);

module.exports = model("card", CardModel);