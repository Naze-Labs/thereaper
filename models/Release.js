const { model, Schema } = require("mongoose");

function daTe(params) {
  let dat = new Date();
  let min = dat.getMinutes();
  dat.setMinutes(min + 3);

  return `${dat}`;
}

const ReleaseModel = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    store: {
      trim: true,
      type: String,
      required: true,
      default: "NewEgg",
    },
    description: {
      type: String,
      trim: true,
    },
    countdown: {
      trim: true,
      type: Number,
      default: 0,
    },

    dueDate: {
      type: String,
      trim: true,
      default: daTe(),
    },
    success: {
      type: String,
      trim: true,
    },
    failed: {
      type: String,
      trim: true,
    },
    // consoles: Array
  },
  { timestamps: true }
);

module.exports = model("release", ReleaseModel);
