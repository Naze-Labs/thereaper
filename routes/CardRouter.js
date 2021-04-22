const CardController = require("../controllers/CardController");
const { Auth } = require("./../helpers/middlewares/Auth");

module.exports = (router) => {
  router
    .route("/card")
    .post(Auth.verifyToken, CardController.CreateCard)
    .get(Auth.verifyToken, CardController.GetUserCard);

  router
    .route("/allCard")
    .get(Auth.verifyToken, CardController.GetAllCard);

  router
    .route("/card/:id")
    .patch(Auth.verifyToken, CardController.UpdateCard)
    .delete(Auth.verifyToken, CardController.deleteCard);
};
