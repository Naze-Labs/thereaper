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

app.get("*", (req, res) => {
  res.send("Page not found");
});


const port = process.env.PORT || 5000;

let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("App running");
  }
});

server.timeout = 0;
