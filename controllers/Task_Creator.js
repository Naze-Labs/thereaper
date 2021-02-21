const path = require("path");
const fs = require("fs");
const EggBot = require("./../stores/NewEgg/bot");
const MultiTask = require("async");

module.exports = ({ body }, res) => {
  let Task_Result = {
    Failed: [],
    Passed: []
  };
  let { inputs, store } = body;
  try {
    if (store === "EggBot") {
      let multiBots = inputs.map(input => SingleBot(callback, input));

      async.parallel(multiBots, function(err, result) {
        if (err) {
          console.log({ err });
          Task_Result.Failed.push(err);
          return err;
        } else {
          console.log(result);
          Task_Result.Passed.push(result);
          return result;
        }
        //save it in a database
      });
    }
    return res.jso
  } catch (error) {
    //save it in a database
    return; // Error Status
  }
  let all_sales = [];

  res.status(200).json(all_sales);
};
