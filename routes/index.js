const TaskRouter = require("./TaskRouter");
const UserRouter = require("./UserRouter");
const ReleaseRouter = require("./ReleaseRouter");

module.exports = router => {
  TaskRouter(router);
  UserRouter(router);
  ReleaseRouter(router);
};
