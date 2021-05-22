const Address = require("../models/Address");
const Task = require("../models/Task");

const cron = require("node-cron");

const {
  updateAddressValidator,
  createAddressValidator,
} = require("./../helpers/validators/address");
const { StartBotForAddress } = require("./../helpers/utils/watcher");

module.exports = {
  async CreateAddress(req, res) {
    let { error } = createAddressValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let { _id } = req.decoded;
        let {
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          email,
          phone,
          postalCode,
          country,
        } = req.body;
        let address = {
          creator: _id,
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          email,
          phone,
          postalCode,
          country,
        };
        let newAddress = new Address(address);
        let saveAddress = await newAddress.save();
        await res.status(200).json({
          msg: "address has been created",
          data: newAddress,
          saveAddress,
        });
      } catch (error) {
        console.log({ error });
        await res.status(401).json({
          msg: "address creation unsuccessful",
        });
      }
  },

  async GetAllAddress(req, res) {
    try {
      let { _id } = req.decoded;
      let address = await Address.find({});
      await res.status(200).json({
        msg: "successful",
        data: address,
      });
    } catch (error) {
      console.log({ error });
      await res.status(401).json({
        msg: "address creation unsuccessful",
      });
    }
  },

  async GetUserAddress(req, res) {
    try {
      let { _id } = req.decoded;
      let address = await Address.find({ creator: _id });
      await res.status(200).json({
        msg: "successful",
        data: address,
      });
    } catch (error) {
      console.log({ error });
      await res.status(401).json({
        msg: "address creation unsuccessful",
      });
    }
  },

  async UpdateAddress(req, res) {
    console.log({ body: req.body });
    let {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      state,
      email,
      phone,
      postalCode,
      country,
    } = req.body;
    let { error } = updateAddressValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let address = await Address.findById(req.params.id);
        address.firstName = (await firstName) || address.firstName;
        address.lastName = (await lastName) || address.lastName;
        address.addressLine1 = (await addressLine1) || address.addressLine1;
        address.addressLine2 = (await addressLine2) || address.addressLine2;
        address.city = (await city) || address.city;
        address.postalCode = (await postalCode) || address.postalCode;
        address.state = (await state) || address.state;
        address.email = (await email) || address.email;
        address.phone = (await phone) || address.phone;
        address.country = (await country) || address.country;

        let saveAddress = await address.save();
        await res.status(200).json({
          msg: "address has been updated",
          data: saveAddress,
        });
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          error: JSON.stringify(error),
        });
        console.log({ error });
      }
  },

  async deleteAddress(req, res) {
    try {
      let { _id } = req.decoded;
      await Address.findByIdAndDelete(req.params.id);
      await res.status(200).json({
        msg: "address has been deleted",
      });
    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        error,
      });
    }
  },
};
