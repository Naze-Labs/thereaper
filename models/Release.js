const { model, Schema } = require("mongoose");

function daTe(params) {
  return new Date();
}

const ReleaseModel = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    name: {
      type: String,
      trim: true,
      required: true
    },
    store: {
      trim: true,
      type: String,
      required: true,
      default: "NewEgg"
    },
    description: {
      type: String,
      trim: true
    },
    countdown: {
      trim: true,
      type: Number,
      default: 0
    },

    dueDate: {
      type: String,
      trim: true,
      default: daTe()
    }
    // consoles: Array
  },
  { timestamps: true }
);

module.exports = model("release", ReleaseModel);
