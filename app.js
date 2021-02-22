const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const { Routes } = require("./routes/index");
const path = require("path");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(router);

app.use("/api/v1", router);

// app.get("*", (req, res) =>
//   res.status(200).sendFile(path.join(__dirname, "./../dist", "index.html"))
// );

const port = process.env.PORT || 5000;

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("App running");
  }
});
