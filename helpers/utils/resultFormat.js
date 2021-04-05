// let results = require("./services/tmp/data.json");
module.exports = function resultFormat(results) {
  console.log({ resultForat: JSON.stringify(results) });
  let tasks = [];
  let release = [];
  let checkRelease;
  if (results) {
    if (results.length > 0) {
      for (let result in results) {
        if (results[result]) {
          if (results[result].input) {
            if (results[result].input.inputs) {
              if (results[result].input.inputs.length > 0) {
                for (let data of results[result].input.inputs) {
                  tasks = tasks.concat(data);
                }
              }
            }
          }
        }
      }
    }
  }
  for (let dat of tasks) {
    checkRelease = release.some((rlsID) => rlsID === dat.release);
    if (checkRelease === false) {
      release.push(dat.release);
    }
  }

  release = release.map((dap) => {
    return {
      id: dap,
      failed: tasks.filter(
        (datas) => datas.release === dap && datas.status === "failed"
      ).length,
      success: tasks.filter(
        (datas) => datas.release === dap && datas.status === "success"
      ).length,
    };
  });
  return { release, tasks };
};
