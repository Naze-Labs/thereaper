const EggBot = require("./../stores/NewEgg/bot");
let async = require("async");

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
  } else
    try {
      // if (store === "EggBot") {
      let multiBots = inputs.map(
        input =>
          function(callback) {
            let input_with_countdown = {
              ...input,
              countdown
            };
            console.log({ countdown });
            EggBot(callback, input_with_countdown);
          }
      );
      setTimeout(() => {
        async.parallel(multiBots, function(err, result) {
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
};
