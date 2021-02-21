require("dotenv").config();

module.exports = {
  email: process.env.email,
  password: process.env.password,
  cv2: process.env.cv2,
  to: process.env.price_limit,
  price_limit: process.env.price_limit,
  auto_submit: process.env.auto_submit,
  refresh_time: process.env.refresh_time,
  item_url: process.env.item_url
};
