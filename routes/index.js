const TaskRoutes = require("./Task_Routes");
const GetResultRoutes = require("./Get_Tasks");

module.exports.Routes = router => {
  TaskRoutes(router), GetResultRoutes(router);
};
