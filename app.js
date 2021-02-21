// require("./stores/NewEgg/bot")();

{
  /*
const express = require('express')
const app = express()
const Pages = require('./pages_routes');
const cors = require('cors')
const router = express.Router();
const { Routes } = require("./routes/index")
const { ProductFetcher } = require('./services/ProductFetcher')
const path = require('path')
require('dotenv').config();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

Routes(router);

ProductFetcher.DailyJob()

app.use('/api/v1', router);

app.get('*', Pages)


const port = process.env.PORT || 5000;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("App running");
  }
});
*/
}

function CallOne(callback) {
  setTimeout(() => {
    callback(null, "2000");
    console.log(2000);
  }, 2000);
}

function CallTwo(callback) {
  setTimeout(() => {
    console.log(4000);
    callback(null, "4000");
  }, 4000);
}

function CallThree(callback) {
  setTimeout(() => {
    console.log(6000);
    callback(null, "6000");
  }, 6000);
}

let multiBots = inputs.map(
  input =>
    function Bot(callback) {
      callback(null, input);
    }
);
console.log({ multiBots });

async.parallel(multiBots, function(err, result) {
  if (err) {
    console.log(result);
    return err;
  } else {
    console.log(result);
    return result;
  }
});
