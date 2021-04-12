module.exports.Listener = () => {
  const { setQueues, BullAdapter } = require("bull-board");
  const Bull = require("bull");
  var redis = require("redis");
  let client = redis.createClient(REDIS_PORT, REDIS_HOST);
  let resultFormat = require("./../../helpers/utils/resultFormat");
  const Task = require("../../models/Task");
  const Release = require("../../models/Release");

  let machineQueue1 = new Bull(`machine1`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  });
  let machineQueue2 = new Bull(`machine2`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  });
  let machineQueue3 = new Bull(`machine3`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  });
  let machineQueue4 = new Bull(`machine4`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  });
  let machineQueue5 = new Bull(`machine5`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
    },
  });

  setQueues([
    new BullAdapter(machineQueue1),
    new BullAdapter(machineQueue2),
    new BullAdapter(machineQueue3),
    new BullAdapter(machineQueue4),
    new BullAdapter(machineQueue5),
  ]);

  client.subscribe([
    "machine1",
    "machine2",
    "machine3",
    "machine4",
    "machine5",
  ]);
  

  client.on("message", (channel, message) => {
    let result = resultFormat([{ input: { inputs: JSON.parse(message) } }]);
    let machine = channel.slice(7);
    console.log("message", {
      channel,
      message: JSON.stringify(result),
    });

    console.log({ result });

    result.tasks.forEach(async (data) => {
      let { countdown, dueDate, store, _id, status } = data;
      let task = await Task.findById(_id);
      task.countdown = (await countdown) || task.countdown;
      task.dueDate = (await dueDate) || task.dueDate;
      task.store = (await store) || task.store;
      task.status = (await status) || task.status;
      task.machine = Number(machine) || Number(task.machine);
      let saveTask = await task.save();
      console.log({ saveTask });
    });

    result.release.forEach(async (data) => {
      let { success, failed, id } = data;
      let release = await Release.findById(id);
      release.success =
        Number(success) + Number(release.success) || release.success || 0;
      release.failed =
        Number(failed) + Number(release.failed) || release.failed || 0;

      let saveRelease = await release.save();
      console.log({ saveRelease });
    });
  });
};
