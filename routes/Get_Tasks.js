const Get_Results = require("./../controllers/Get_Task");

module.exports = router => {
  router.route("/reap").get(Get_Results);
};
