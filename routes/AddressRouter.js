const AddressController = require("../controllers/AddressController");
const { Auth } = require("./../helpers/middlewares/Auth");

module.exports = (router) => {
  router
    .route("/address")
    .post(Auth.verifyToken, AddressController.CreateAddress)
    .get(Auth.verifyToken, AddressController.GetUserAddress);

  router
    .route("/allAddress")
    .get(Auth.verifyToken, AddressController.GetAllAddress);

  router
    .route("/address/:id")
    .patch(Auth.verifyToken, AddressController.UpdateAddress)
    .delete(Auth.verifyToken, AddressController.deleteAddress);
};
