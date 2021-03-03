const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const { Routes } = require("./routes/index");
const path = require("path");
const immediateRun = require("./ImmediateRun");
let inputs = require("./server/inputs.json");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(router);

app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.send("Page not found");
});

immediateRun(inputs);

const port = process.env.PORT || 5000;

let server = app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log("App running");
  }
});

server.timeout = 0;
