const express = require("express");
const app = express();
const cors = require("cors");
const Router = express.Router();
const { router } = require("bull-board");
const path = require("path");
const mongoose = require("mongoose");
const Routes = require("./routes/index");
const { Listener } = require("./helpers/utils/listener");

const { CronJob } = require("./controllers/ReleaseController");
// const runNow = require("./samples/runNow");
// const inputs = require("./samples/input.json");

let { DB } = require("./config");

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

Routes(Router);

app.use("/board", router);
app.use("/api/v1", Router);




const build_path = path.join(__dirname, 'Interface', 'build')
app.use(express.static(build_path))
app.get('/*', (req, res) => {
  res.sendFile(path.join(build_path, 'index.html'))
})


Listener();
CronJob();

DB = DB || process.env.DB;
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("mongo started"));

const server = app.listen(8001, () => console.log("Server running"));

server.timeout = 0;
