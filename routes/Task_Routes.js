const Task_Creator = require("./../controllers/Central_Server");

module.exports = router => {
  router.route("/reap").post(Task_Creator);
};
