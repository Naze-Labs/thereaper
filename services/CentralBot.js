const async = require("async");
const Task = require("../models/Task");
const Release = require("../models/Release");
let splitter = require("./../helpers/utils/splitter");

const Machine = require("./Machine");
const jsonfile = require("jsonfile");

module.exports = (inputs) => {
  let splittedInputs = splitter(inputs);
  console.log({ inputs });
  try {
    let multiMachines = splittedInputs.map(
      (input, index) =>
        function (callback) {
          let inputWithIndex = {
            index,
            input,
          };
          console.log({ inputWithIndex });
          Machine(callback, inputWithIndex);
        }
    );
    setTimeout(() => {
      async.parallel(multiMachines, function (err, result) {
        if (err) {
          console.log("Error");
        } else {
          console.log({ result });
          let resultFormat = require("./../helpers/utils/resultFormat");
          resultFormat = resultFormat(result);

          resultFormat.tasks.forEach(async (data) => {
            let { countdown, dueDate, store, status } = data;
            let task = await Task.findById(data._id);
            task.countdown = (await countdown) || task.countdown;
            task.dueDate = (await dueDate) || task.dueDate;
            task.store = (await store) || task.store;
            // task.status = (await status) || task.status;
            let saveTask = await task.save();
            console.log({ saveTask });
          });

          resultFormat.release.forEach(async (data) => {
            let { success, failed, id } = data;
            let release = await Release.findById(data.id);
            release.success = (await success) || release.success;
            release.failed = (await failed) || release.failed;

            let saveRelease = await release.save();
            console.log({ saveRelease });
          });
        }

        // const file = `${__dirname}/tmp/data.json`;
        // jsonfile.writeFile(file, result, { spaces: 2 }, function (err) {
        //   if (err) console.error(err);
        // });
      });
    });
  } catch (error) {
    console.log({ error });
  }
};
