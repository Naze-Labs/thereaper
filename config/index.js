require("dotenv").config();

module.exports = {
  REDIS_URL,
  SITE_URL,
  APP_SECRET,
  DB,
  PORT,
  NODE_ENV,
  EMAIL,
  PASSWORD,
  Client_ID,
  Client_secret,
  REDIS_PORT,
  REDIS_HOST,
  PASSWORD,
} = process.env;

// module.exports = IN_PROD = NODE_ENV === "development"
