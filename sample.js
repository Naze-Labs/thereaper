let r = new Date().toISOString();
// let { CronJob } = require("cron");

let c = new Date().getUTCHours();
// console.log({ r, c });

let tasks = [
  {
    status: "pending",
    _id: "60688e60f75cf3287ca513af",
    creator: "606888c4b5bda226e0f6cdb6",
    release: "60688c7cea5db90448ee5700",
    email: "omoniyi@gmail.com",
    password: "joi.string().min(4).required()",
    item_url: "wewe",
    ccv: 202,
    createdAt: "2021-04-03T15:48:48.308Z",
    updatedAt: "2021-04-03T15:48:48.308Z",
    __v: 0,
  },
  {
    status: "pending",
    _id: "60688e60f75cf3287ca513af",
    creator: "606888c4b5bda226e0f6cdb6",
    release: "60688c7cea5db90448ee5700",
    email: "omoniyi@gmail.com",
    password: "joi.string().min(4).required()",
    item_url: "wewe",
    ccv: 202,
    createdAt: "2021-04-03T15:48:48.308Z",
    updatedAt: "2021-04-03T15:48:48.308Z",
    __v: 0,
  },
];

tasks = tasks.reduce((prevData, currentData) => [].concat(currentData));

// console.log({ tasks });

// let a = [1, 2, 3, 4, 5];

// a = a.map((data, i, arr) => {
//   data = data + 1;
//   return arr;
// });
// a = a.concat([23, 303]);
// a = a.concat([23]);
// a = a.concat([23]);
// console.log(a);
// 60688c7cea5db90448ee5700
// 6069ab8877b38d17e49ed5cd

// let a = [];
// new Promise(function (res, rej) {
//   [[1], [2], 3, 4].map(async (at) => {
//     a = a.concat(at);
//     res(a);
//   });
// }).then((data) => {
//   console.log({ data });
// });
let w = new Date().toISOString();
let min = new Date(w).getMinutes();
let hour = new Date(w).getHours();
console.log({ min, hour, w });
min = 12;
hour = 21;

let j = w instanceof Date;
console.log({ j });
var CronJob = require("cron").CronJob;
var job = new CronJob(
  `${min + 1} ${hour} * * *`,
  function () {
    console.log("You will see this message every second");
    job.stop();
  },
  null,
  true,
  "America/Los_Angeles"
);
job.start();

function pad(number, length) {
  var str = "" + number;
  while (str.length < length) {
    str = "0" + str;
  }
  return str;
}

// const jsonfile = require("jsonfile");
// const file = `${__dirname}/tmp/data.json`;
// // const file = '/tmp/data.json'
// const obj = { name: "JP" };

// jsonfile.writeFile(file, obj, function (err) {
//   if (err) console.error(err);
// });



// var offset = new Date().getTimezoneOffset();
// offset =
//   (offset < 0 ? "+" : "-") + // Note the reversed sign!
//   pad(parseInt(Math.abs(offset / 60)), 2) +
//   pad(Math.abs(offset % 60), 2);
// console.log({ offset });

// The loop condition is converted into a cron expression (based on vue)
// function dateChangeCron(dates) {
//   //dates is the entire date type object passed in effectTime:yyyy-MM-d:h is the execution time
//   let m = "";
//   let s = "";

//   let h = "";
//   let w = dates.wloopValue || "";
//   let mo = dates.mloopValue || "";
//   if (dates.effectTime) {
//     h = dates.effectTime.getHours();
//     m = dates.effectTime.getMinutes();
//     s = dates.effectTime.getSeconds();
//   }
//   let loopType = dates.loopType;
//   //loopType :[{value:'ONE_TIME', label:'Single execution'},
//   // {value:'DAILY', label:'Recycle by day'},
//   // {value:'WEEKLY', label:'cycle by week'},
//   // {value:'MONTHLY', label:'Monthly cycle'}]
//   var cron = "";
//   if (loopType === "DAILY") {
//     cron = s + " " + m + " " + h + " * * ? *";
//   } else if (loopType === "WEEKLY") {
//     // Sunday is 1 and week 6 is 7
//     cron = s + " " + m + " " + h + " * * " + w.join(",") + " *";
//   } else if (loopType === "MONTHLY") {
//     // 1-31
//     cron = s + " " + m + " " + h + " " + mo.join(",") + " * ? *";
//   }
//   console.log({ cron });
//   return cron;
//   //  console.log（cron）      19 30 16 * * 2,3 *
// }
// let d = new Date();
// console.log({ d });
// console.log(
//   dateChangeCron({
//     effectTime: d,
//     loopType: "DAILY",
//   })
// );
