const express = require("express");
const app = express();
const cors = require("cors");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const Routes = require("./routes/index");

const { CronJob } = require("./controllers/ReleaseController");
// const runNow = require("./samples/runNow");
// const inputs = require("./samples/input.json");

let { DB } = require("./config");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(router);

app.use("/api/v1", router);

app.get("*", (req, res) => {
  res.send("Page not found");
});


// runNow(inputs);(
CronJob();

DB = DB || process.env.DB;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo started"));

const server = app.listen(8000, () => console.log("Server running"));

server.timeout = 0;