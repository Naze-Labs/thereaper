const moment = require("moment");
const Release = require("../../models/Release");
const Task = require("../../models/Task");

const requireToStartBotForRelease = dueDate => {
  const newDate = new Date();
  const currentDate = new Date(moment(newDate).startOf("minute").format());
  const currentDueDate = new Date(moment(dueDate).startOf("minute").format());
  console.log({ currentDate, currentDueDate });
  return `${currentDate}` === `${currentDueDate}`;
};

module.exports.StartBotForRelease = () => {
  Release.find({}, (err, release) => {
    if (err) throw err;

    if (release.length !== 0) {
      const ReadyReleases = release.filter(task =>
        requireToStartBotForRelease(task.dueDate)
      );
      console.log({ ReadyReleases });
      let AllTasksInReadyRelease = ReadyReleases.map(task => {
        task = Task.find({ release: task._id });
        sendReminders(task.creatorEmail, task.text, task.todoName);
      });
      if (AllTasksInReadyRelease.length > 1) {
        AllTasksInReadyRelease.reduce((prevData, currentData) =>
          prevData.concat(...currentData)
        );
      }

      console.log({ AllTasksInReadyRelease });
    }
  });
};
