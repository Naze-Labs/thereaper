const EggBot = require("../stores/NewEgg/bot");
let async = require("async");

module.exports = inputs => {
  
  console.log({ inputs });
  if (Array.isArray(inputs) === false) {
    console.log("No input");
    console.log({ message: "Inputs can not be empty" });
  } else if (inputs.length < 1) {
    console.log("less than 1");
    console.log({ message: "Inputs can not be empty" });
  } else
    try {
      let multiBots = inputs.map(
        input =>
          function(callback) {
            EggBot(callback, input);
          }
      );
      
      setTimeout(() => {
        async.parallel(multiBots, function(err, result) {
          if (err) {
            console.log({ message: "Internal Error" });
          } else {
            console.log({ result });
          }
        });
      });
    } catch (error) {
      console.log({ message: "Internal Error" });
    }
};
