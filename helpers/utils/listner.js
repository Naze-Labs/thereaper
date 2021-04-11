var redis = require("redis");
const resultForat = require("./resultFormat");
let client = redis.createClient(REDIS_PORT, REDIS_HOST);

client.subscribe(["machine1", "machine2"]);
client.on("message", (channel, message) => {
  console.log("message", {
    channel,
    message: JSON.stringify(
      resultForat([{ input: { inputs: JSON.parse(message) } }])
    ),
  });
});
