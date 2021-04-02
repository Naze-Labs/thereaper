const UserController = require("./../controllers/UserController");

module.exports = router => {
  router.route("/user/signup").post(UserController.signUp);
  router.route("/user/login").post(UserController.login);
};