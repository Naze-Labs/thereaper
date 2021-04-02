const { Auth } = require("../helpers/middlewares/Auth");
const TaskController = require("../controllers/TaskController");

module.exports = router => {
  router
    .route("/task/:id")
    .patch(Auth.verifyToken, TaskController.UpdateTask)
    .delete(Auth.verifyToken, TaskController.deleteTask)
    .get(Auth.verifyToken, TaskController.getAllTask)
    .post(Auth.verifyToken, TaskController.CreateTask);
};
