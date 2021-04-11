const async = require("async");
let splitter = require("./../helpers/utils/splitter");
const Machine = require("./Machine");
const jsonfile = require("jsonfile");

module.exports = (inputs) => {
  let splittedInputs = splitter(inputs);
  try {
    let multiMachines = splittedInputs.map(
      (input, index) =>
        function (callback) {
          let inputWithIndex = {
            index,
            input,
          };
          Machine(callback, inputWithIndex);
        }
    );
    async.parallel(multiMachines, function (err, result) {
      if (!err) {
        console.log({ result });
      } else {
        console.log({ err });
      }
    });
  } catch (error) {
    console.log({ error });
  }
};
