const ReleaseController = require("../controllers/ReleaseController");
const { Auth } = require("./../helpers/middlewares/Auth");

module.exports = (router) => {
  router
    .route("/release")
    .post(Auth.verifyToken, ReleaseController.CreateRelease)
    .get(Auth.verifyToken, ReleaseController.GetUserRelease);

  router
    .route("/allRelease")
    .get(Auth.verifyToken, ReleaseController.GetAllRelease);

  router
    .route("/release/:id")
    .patch(Auth.verifyToken, ReleaseController.UpdateRelease)
    .delete(Auth.verifyToken, ReleaseController.deleteRelease);
};
