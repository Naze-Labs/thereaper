module.exports = function Splitter(servers) {
  let total_servers = Array(5).fill([]);
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