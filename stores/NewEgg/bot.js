const axios = require("axios");
let Bots = [
  "https://bot4-tf27jtyyna-wl.a.run.app/api/v1/reap",
  "https://bot02-tf27jtyyna-wl.a.run.app/api/v1/reap",
  "https://thereaperbot-tf27jtyyna-wl.a.run.app/api/v1/reap",
  "https://bot3-tf27jtyyna-wl.a.run.app/api/v1/reap"
];

async function report(log) {
  currentTime = new Date();
  console.log(currentTime.toString().split("G")[0] + ": " + log);
}

module.exports = function(callback, input) {
  setTimeout(async () => {
    let start = new Date().getTime();
    await report("Started");
    let response;
    try {
      let server = await axios.post(Bots[input.index], input.input);
      server = await server.data;
      response = server;
    } catch (error) {
      response = { msg: error.message, res: error.response };
    } finally {
      let end = new Date().getTime();
      await callback(null, {
        Bot: `${input.index + 1}`,
        response,
        duration: `${(end - start) / 1000} sec`
      });
    }
  });
};
