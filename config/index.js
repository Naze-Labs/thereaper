require('dotenv').config()

module.exports = {
  SITE_URL,
  APP_SECRET,
  DB,
  PORT,
  NODE_ENV,
  EMAIL,
  PASSWORD,
  Client_ID,
  Client_secret
} = process.env

// module.exports = IN_PROD = NODE_ENV === "development"