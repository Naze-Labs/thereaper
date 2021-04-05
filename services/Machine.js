const axios = require("axios");
let Bots = [
  "http://localhost:8001/task",
  "http://localhost:8002/task",
  "http://localhost:8003/task",
  "http://localhost:8004/task",
  // "https://bot2-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot4-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot3-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://thereaperbot-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot02-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://central-server-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot7-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot8-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot9-tf27jtyyna-wl.a.run.app/api/v1/reap",
  // "https://bot10-tf27jtyyna-wl.a.run.app/api/v1/reap",
];

module.exports = function (callback, inputs) {
  setTimeout(async () => {
    // await report("Started");
    let response, input, done;
    try {
      let server = await axios.post(Bots[inputs.index], inputs.input);
      server = await server.data;
      response = server;
      done = {
        Bot: `${inputs.index + 1}`,
        input: response,
      };
    } catch (error) {
      response = { msg: error.message, res: error.response };
      done = response;
    } finally {
      await callback(null, done);
    }
  });
};
