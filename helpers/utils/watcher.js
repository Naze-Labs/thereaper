const moment = require("moment");
const Release = require("../../models/Release");
const Task = require("../../models/Task");
const CentralBot = require("./../../services/CentralBot");

const requireToStartBotForRelease = (dueDate) => {
  const newDate = new Date();
  const currentDate = new Date(
    moment(newDate).startOf("minute").format()
  ).getTime();
  const currentDueDate = new Date(
    moment(dueDate).startOf("minute").format()
  ).getTime();

  let minsB4 = 3 * 60000;
  console.log({
    currentDate: new Date(currentDate).toISOString(),
    currentDueDate: new Date(currentDueDate).toISOString(),
  });
  return currentDate === currentDueDate - minsB4;
};

module.exports.StartBotForRelease = () => {
  Release.find({}, async (err, releases) => {
    if (err) throw err;

    if (releases.length !== 0) {
      let ReadyReleases = releases.filter((release) =>
        requireToStartBotForRelease(release.dueDate)
      );

      let retrieveTasks = [];

      new Promise(function (res, rej) {
        ReadyReleases = ReadyReleases.map(async (data, i) => {
          let indexFound = 5;
          for (; indexFound > 0; indexFound--) {
            await Task.find({ release: data._id }, (err, tasks) => {
              if (!err) {
                if (tasks.length !== 0) {
                  tasks = tasks.map((task) => {
                    return {
                      ...task._doc,
                      dueDate: data.dueDate,
                      store: data.store,
                      countdown: data.countdown,
                    };
                  });
                }
                retrieveTasks = retrieveTasks.concat(tasks);
              }
            });
            if (retrieveTasks.length > 0 || indexFound === 1) {
              console.log("start count " + `${indexFound}`);
              console.log({ res_lenght: retrieveTasks.length });
              indexFound = 0;
              res(retrieveTasks);
              break;
            }
          }
        });
      }).then((readyInputs) => {
        CentralBot(readyInputs);
      });
    }
  });
};
