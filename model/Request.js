let model = require("mongoose");
const RequestModel = model.Schema({
  author: String,
  task: Array,
  
});
export default model.model("Request_Model", RequestModel);


