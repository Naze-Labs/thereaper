const Card = require("../models/Card");
const Task = require("../models/Task");

const cron = require("node-cron");

const {
  updateCardValidator,
  createCardValidator,
} = require("./../helpers/validators/card");

module.exports = {
  async CreateCard(req, res) {
    let { error } = createCardValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let { _id } = req.decoded;
        let {
          friendlyName,
          nameOnCard,
          cardNumber,
          expirationYear,
          expirationMonth,
          securityCode,
        } = req.body;
        let card = {
          creator: _id,
          friendlyName,
          nameOnCard,
          cardNumber,
          expirationYear,
          expirationMonth,
          securityCode,
        };
        let newCard = new Card(card);
        let saveCard = await newCard.save();
        await res.status(200).json({
          msg: "card has been created",
          data: newCard,
          saveCard,
        });
      } catch (error) {
        console.log({ error });
        await res.status(401).json({
          msg: "card creation unsuccessful",
        });
      }
  },

  async GetAllCard(req, res) {
    try {
      let { _id } = req.decoded;
      let card = await Card.find({});
      await res.status(200).json({
        msg: "successful",
        data: card,
      });
    } catch (error) {
      console.log({ error });
      await res.status(401).json({
        msg: "card creation unsuccessful",
      });
    }
  },

  async GetUserCard(req, res) {
    try {
      let { _id } = req.decoded;
      let card = await Card.find({ creator: _id });
      await res.status(200).json({
        msg: "successful",
        data: card,
      });
    } catch (error) {
      console.log({ error });
      await res.status(401).json({
        msg: "card creation unsuccessful",
      });
    }
  },

  async UpdateCard(req, res) {
    let {
      friendlyName,
      nameOnCard,
      cardNumber,
      expirationYear,
      expirationMonth,
      securityCode,
    } = req.body;
    let { error } = updateCardValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let card = await Card.findById(req.params.id);
        console.log({ friendlyName });
        card.friendlyName = (await friendlyName) || card.friendlyName;
        card.nameOnCard = (await nameOnCard) || card.nameOnCard;
        card.cardNumber = (await cardNumber) || card.cardNumber;
        card.expirationYear = (await expirationYear) || card.expirationYear;
        card.expirationMonth = (await expirationMonth) || card.expirationMonth;
        card.securityCode = (await securityCode) || card.securityCode;

        let saveCard = await card.save();
        await res.status(200).json({
          msg: "card has been updated",
          data: saveCard,
        });
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          error: JSON.stringify(error),
        });
        console.log(error);
      }
  },

  async deleteCard(req, res) {
    try {
      //   let { _id } = req.decoded;
      await Card.findByIdAndDelete(req.params.id);
      await res.status(200).json({
        msg: "card has been deleted",
      });
    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        error,
      });
    }
  },
};
