module.exports = function Splitter(inputs) {
  let ten_inputs = Array(10).fill([]);
  let box;
  while (inputs.length > 0) {
    for (let num in ten_inputs) {
      box = inputs.splice(0, 1);
      if (box.length > 0) {
        ten_inputs[num] = [...ten_inputs[num], ...box];
      }
    }
  }
  ten_inputs = ten_inputs
    .filter((data) => data.length > 0)
    .map((data) => ({ inputs: data }));
  return ten_inputs;
};
