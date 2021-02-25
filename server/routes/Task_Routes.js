const Task_Creator = require("../controllers/Task_Creator");

module.exports = router => {
  router.route("/reap").post(Task_Creator);
};
