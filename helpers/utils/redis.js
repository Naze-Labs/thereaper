// let Bull = require("bull");
// const { setQueues, BullAdapter } = require("bull-board");
// const { REDIS_PORT, REDIS_HOST, PASSWORD } = require("./../../config/index");

// const taskQueue = new Bull("task", {
//   redis: {
//     port: REDIS_PORT,
//     host: REDIS_HOST,
//   },
// });

// const doneQueue = new Bull("done", {
//   redis: {
//     port: REDIS_PORT,
//     host: REDIS_HOST,
//   },
// })

// setQueues([new BullAdapter(doneQueue, taskQueue)]);

// taskQueue.process(taskProcess);
// doneQueue.process(taskProcess);

// module.exports = sendTask = (data) => {
//   taskQueue.add(data, { data });
// };

// const sndTask = (data) => {
//   taskQueue.add(data);
// };
// const dneTask = (data) => {
//   doneQueue.add(data);
// };

// sndTask({ job: "job1" });
// dneTask({ job: "job2" });


// taskQueue.on("completed", (j, e) => {
//   console.log("job1 completed");
// });
// doneQueue.on("completed", () => {
//   console.log("job2 completed");
// });

// var redis = require("redis");

// let client = redis.createClient(REDIS_PORT, REDIS_HOST);

// client.subscribe(["proceess1", "proceess2"], (a, b) => {});
// client.on("message", (a, b) => {
//   console.log("message", a, b);
// });

// // client.subscribe("MyInfo");
// // client.on("message", (data, message) => {
// //   console.log({ message, data:  new Date().getTime() });
// // });

// // client.subscribe("MyInfo", (data, cb) => {
// //   console.log("subscribe", { sub:  new Date().getTime(), cb });
// // });
// // client.on("message", (data, cb) => {
// //   console.log("message", { data, cb });
// // });
// // client.auth(PASSWORD, function () {
// //   console.log("Connected!");
// // });
