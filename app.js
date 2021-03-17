const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const { Routes } = require("./routes/index");
// let mysql = require("mysql");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(router);

app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.send("Page not found");
});


const port = process.env.PORT || 5001;

// module.exports = mySqlConnection = mysql.createConnection({
//   user: "",
//   host: "",
//   password: "",
//   database: ""
// });

// mySqlConnection.connect(err => {
//   if (!err) console.log("Connected to DB");
//   else {
//     console.log(
//       "An Error Occured Connecting to DB",
//       JSON.stringify(err, undefined, 2)
//     );
//   }
// });

let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("App running");
  }
});

server.timeout = 0;
