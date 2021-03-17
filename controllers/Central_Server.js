let async = require("async");
let splitter = require("./../utils/splitter");
const Server = require("../stores/NewEgg/bot");

module.exports = ({ body }, res) => {
  let { inputs, countdown } = body;
  console.log({ inputs });

  if (Array.isArray(inputs) === false) {
    console.log("No input");
    return res.status(400).json({
      message: "Inputs can not be empty"
    });
  } else if (inputs.length < 1) {
    console.log("less than 1");
    return res.status(400).json({
      message: "Inputs can not be empty"
    });
  } else {
    let splitted_inputs = splitter(countdown, inputs);

    try {
      // if (store === "Server") {
      let multiServers = splitted_inputs.map(
        (input, i) =>
          function(callback) {
            let input_with_countdown = {
              index: i,
              input
            };
            console.log({ countdown });
            Server(callback, input_with_countdown);
          }
      );
      setTimeout(() => {
        async.parallel(multiServers, function(err, result) {
          if (err) {
            return res.status(400).json({
              message: "Internal Error"
            });
          } else {
            console.log(result);
            res.status(200).json({
              result
            });
          }
        });
      });
      // }
    } catch (error) {
      console.log({ error });
      return res.status(400).json({
        message: "Internal Error"
      });
    }
  }
};
