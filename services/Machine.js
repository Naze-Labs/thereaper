const Bull = require("Bull");
let macineQueue;
module.exports = function (callback, inputs) {
  setTimeout(async () => {
    let response, done;
    try {
      macineQueue = new Bull(`machine${inputs.index + 1}`, {
        redis: {
          port: REDIS_PORT,
          host: REDIS_HOST,
        },
      });

      macineQueue.add({
        machine: inputs.index + 1,
        inputs: [...inputs.input.inputs],
      });

      done = "Job Sent";
    } catch (error) {
      done = "Job Failed";
    } finally {
      await callback(null, done);
    }
  });
};
