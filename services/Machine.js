const Bull = require("Bull");
let { REDIS_PORT, REDIS_HOST, REDIS_PASSWORD } = require("./../config/index");
let machineQueue;

let machines = [
  new Bull(`machine1`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine2`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine3`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine4`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine5`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine6`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine7`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine8`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine9`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine10`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine11`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine12`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine13`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
  new Bull(`machine14`, {
    redis: {
      port: REDIS_PORT,
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  }),
];

module.exports = function (callback, inputs) {
  setTimeout(async () => {
    console.log({ inputs });
    let response, done;
    try {
      machines[inputs.index].add({
        machine: inputs.index + 1,
        inputs: [...inputs.input.inputs],
      });

      //      machineQueue.close()

      done = "Job Sent";
    } catch (error) {
      console.log({ error });
      done = "Job Failed";
    } finally {
      await callback(null, done);
    }
  });
};
