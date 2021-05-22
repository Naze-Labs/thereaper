const UserController = require("./../controllers/UserController");

module.exports = router => {
  router.route("/user/register").post(UserController.signUp);
  router.route("/user/login").post(UserController.login);
};