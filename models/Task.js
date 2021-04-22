const { model, Schema } = require("mongoose");
const TaskModel = new Schema(
  {
    product_name: {
      type: String,
      trim: true,
      required: true,
    },
    card: {
      type: Schema.Types.ObjectId,
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
    },
    release: {
      type: Schema.Types.ObjectId,
    },
    creator: {
      type: Schema.Types.ObjectId,
    },
    size: {
      type: String,
      trim: true,
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
    machine: {
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
