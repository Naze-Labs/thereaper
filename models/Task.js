const { model, Schema } = require("mongoose");
const TaskModel = new Schema(
  {
    release: {
      type: Schema.Types.ObjectId,
    },
    creator: {
      type: Schema.Types.ObjectId,
    },
    email: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: true,
    },
    item_url: {
      type: String,
      trim: true,
      required: true,
    },
    ccv: {
      type: Number,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      trim: true,
      default: "pending",
    },
    countdown: {
      type: Number,
      trim: true,
    },
    store: {
      type: String,
      trim: true,
    },
    dueDate: {
      type: String,
      trim: true,
    },

    // consoles: Array
  },
  { timestamps: true }
);

module.exports = model("task", TaskModel);
