module.exports = function fola(countdown, inputs) {
  let items;
  let no_of_server = 4;
  let no_of_content = 4;

  items = Math.ceil(inputs.length / no_of_content);
  servers_input = Math.ceil(inputs.length / no_of_server);

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
};
