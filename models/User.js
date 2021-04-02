const { model, Schema } = require("mongoose");
const UserModel = new Schema(
  {
    full_name: String,
    email: String,
    password: String,
    phone: Number,
    userType: String
  },
  { timestamps: true }
);
module.exports = model("user", UserModel);
