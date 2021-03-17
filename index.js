// const axios = require("axios");

// let Bots = [
//   "https://bot2-tf27jtyyna-wl.a.run.app/api/v1/reap",
//   "https://thereaperbot-tf27jtyyna-wl.a.run.app/api/v1/reap",
//   "https://bot3-tf27jtyyna-wl.a.run.app/api/v1/reap",
//   "https://bot4-tf27jtyyna-wl.a.run.app/api/v1/reap"
// ];

// async function Server() {
//   try {
//     let server = await axios.post(Bots[0], {
//       inputs: [
//         {
//           email: "steven.c.udotong@vanderbilt.edu",
//           password: "2ndCome2ndServe!"
//         }
//       ]
//     });

//     server = await server.data;
//     server = JSON.stringify(server);
//     console.log({ server });
//   } catch (error) {
//     console.log({ error });
//   }
// }

// Server();

function fola(countdown, inputs) {
  let items;
  let no_of_server = 4;
  let no_of_content = 4;

  items = Math.ceil(inputs.length / no_of_content);
  // servers_input = Math.ceil(inputs.length / no_of_server);

  // if (inputs.length <= no_of_server + 1) {
  //   servers_input = inputs.length;
  //   no_of_server = items;
  // }

  console.log({ items, no_of_content });

  let i = 0;
  let j;
  let len = [];
  while (i < items) {
    j = inputs.splice(0, no_of_content);
    j = {
      countdown,
      inputs: j
    };
    len.push(j);
    i++;
    console.log(i);
    if (i === 4) {
      break;
    }
  }
  return len;
}

let split_inputs = fola(0, [
  1,
  2,
  3,
  4,
  5,
  7,
  1,
  2,
  3,
  4,
  5,
  7,
  1,
  2,
  3,
  4,
  5,
  7
]);
console.log({ split_inputs: JSON.stringify(split_inputs) });
