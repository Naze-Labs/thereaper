module.exports.Listener = () => {
  const { setQueues, BullAdapter } = require("bull-board");
  var redis = require("redis");
  const Bull = require("bull");
  let {
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD,
  } = require("./../../config/index");
  let client = redis.createClient(REDIS_PORT, REDIS_HOST);
  client.auth(REDIS_PASSWORD, () => {
    console.log("redis connected");
  });

  let resultFormat = require("./../../helpers/utils/resultFormat");
  const Task = require("../../models/Task");
  const Release = require("../../models/Release");

  client.subscribe([
    "machine1",
    "machine2",
    "machine3",
    "machine4",
    "machine6",
    "machine7",
    "machine8",
    "machine9",
    "machine10",
    "machine11",
    "machine12",
    "machine13",
    "machine14",
  ]);

  client.on("message", (channel, message) => {
    let result = resultFormat([{ input: { inputs: JSON.parse(message) } }]);
    //console.log({ result });
    let machine = channel.slice(7);

    //    console.log({ channel, c: JSON.stringify(result, null, 1) });

    result.tasks.forEach(async (data) => {
      let { countdown, dueDate, store, _id, status } = data;
      let task = await Task.findById(_id);
      task.countdown = (await countdown) || task.countdown;
      task.dueDate = (await dueDate) || task.dueDate;
      task.store = (await store) || task.store;
      task.status = (await status) || task.status;
      task.machine = Number(machine) || Number(task.machine);
      let saveTask = await task.save();
      //console.log({ saveTask });
    });

    result.release.forEach(async (data) => {
      let { success, failed, id } = data;
      let release = await Release.findById(id);
      release.success =
        Number(success) + Number(release.success) || release.success || 0;
      release.failed =
        Number(failed) + Number(release.failed) || release.failed || 0;

      let saveRelease = await release.save();
      //console.log({ saveRelease });
    });
  });
};
