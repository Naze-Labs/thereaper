const TaskRouter = require("./TaskRouter");
const UserRouter = require("./UserRouter");
const ReleaseRouter = require("./ReleaseRouter");
const AddressRouter = require("./AddressRouter");
const CardRouter = require("./CardRouter");

module.exports = router => {
  TaskRouter(router);
  UserRouter(router);
  ReleaseRouter(router);
  AddressRouter(router);
  CardRouter(router);
};
