let inputs = [
  {
    email: "omoniyioluwaseun00@gmail.com",
    password: "Seun@2322.",
    item_url:
      "https://www.amazon.com/YIMEIS-Slipcovers-Geometric-Protector-Removable/dp/B07P16N85F",
    store: "Amaon",
    bot: 2,
    dueDate: "2021-05-02T20:10:32.830Z",
  },
  {
    email: "omoniyioluwaseun00@gmail.com",
    password: "Seun@2322.",
    item_url:
      "https://www.amazon.com/YIMEIS-Slipcovers-Geometric-Protector-Removable/dp/B07P16N85F",
    store: "Amaon",
    bot: 2,
    dueDate: "2021-05-02T20:10:32.830Z",
  },
  {
    email: "omoniyioluwaseun00@gmail.com",
    password: "Seun@2322.",
    bot: "4",
    item_url:
      "https://www.amazon.com/YIMEIS-Slipcovers-Geometric-Protector-Removable/dp/B07P16N85F",
    store: "Amazon",
    bot: 2,
    dueDate: "2021-05-02T20:10:32.830Z",
  },
  {
    email: "omoniyioluwaseun00@gmail.com",
    password: "Seun@2322.",
    bot: "4",
    item_url:
      "https://www.amazon.com/YIMEIS-Slipcovers-Geometric-Protector-Removable/dp/B07P16N85F",
    store: "Amazon",
    bot: 5,
    dueDate: "2021-05-02T20:10:32.830Z",
  },
];

function Splitter(servers) {
  let amazon_server = servers.filter((data) => data.store === "Amdsddfazon");
  let other_server = servers.filter((data) => data.store !== "Amazon");

  let total_servers = Array(4).fill([]);
  let box;
  while (other_server.length > 0) {
    for (let num in total_servers) {
      box = other_server.splice(0, 1);
      if (box.length > 0) {
        total_servers[num] = [...total_servers[num], ...box];
      }
    }
  }

  total_servers = total_servers.filter((data) => data.length > 0);

  for (let inp of amazon_server) {
    console.log({ inp: inp.bot });
    total_servers[inp.bot - 1] = total_servers[inp.bot - 1]
      ? [...total_servers[inp.bot - 1], inp]
      : [inp];
  }

  total_servers = total_servers.map((data) => ({ inputs: data }));

  total_servers = total_servers.map((input, index) => ({
    index,
    input,
  }));

  total_servers = total_servers.filter((data) => data);

  return total_servers;
}

console.log(JSON.stringify(Splitter(inputs), null, 1));



function Splitter(servers) {
    let total_servers = Array(4).fill([]);
    let box;
    while (servers.length > 0) {
      for (let num in total_servers) {
        box = servers.splice(0, 1);
        if (box.length > 0) {
          total_servers[num] = [...total_servers[num], ...box];
        }
      }
    }
    total_servers = total_servers
      .filter((data) => data.length > 0)
      .map((data) => ({ inputs: data }));
    return total_servers;
  };