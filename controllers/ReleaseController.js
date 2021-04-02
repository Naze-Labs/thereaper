const Release = require("../models/Release");
const Task = require("../models/Task");

const cron = require("node-cron");

const {
  updateReleaseValidator,
  createReleaseValidator
} = require("./../helpers/validators/release");
const { StartBotForRelease } = require("./../helpers/utils/watcher");
module.exports = {
  async CreateRelease(req, res) {
    try {
      let { _id } = req.decoded;
      let { name, description, store, countdown, dueDate } = req.body;

      let release = {
        creator: _id,
        name,
        description,
        store,
        countdown,
        dueDate
      };
      let newRelease = new Release(release);
      let saveRelease = await newRelease.save();
      await res.status(200).json({
        msg: "release has been created",
        data: newRelease,
        saveRelease
      });
    } catch (error) {
      console.log({ error });
      await res.status(401).json({
        msg: "release creation unsuccessful"
      });
    }
  },

  async GetUserRelease(req, res) {

      try {
        let { _id } = req.decoded;
        let release = await Release.find({ creator: _id });
        await res.status(200).json({
          msg: "successful",
          data: release
        });
      } catch (error) {
        console.log({ error });
        await res.status(401).json({
          msg: "release creation unsuccessful"
        });
      }
  },

  async UpdateRelease(req, res) {
    let { name, description, dueDate, countdown, store } = req.body;
    let { error } = updateReleaseValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let release = await Release.findById(req.params.id);
        release.description = (await description) || release.description;
        release.name = (await name) || release.name;
        release.dueDate = (await dueDate) || release.dueDate;
        release.store = (await store) || release.store;
        release.countdown = (await countdown) || release.countdown;
        let saveRelease = await release.save();
        await res.status(200).json({
          msg: "release has been updated",
          data: saveRelease
        });
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          error
        });
      }
  },

  async deleteRelease(req, res) {
    try {
      let { _id } = req.decoded;
      await Release.findByIdAndDelete(req.params.id);
      await Task.deleteMany({ creator: _id });
      await res.status(200).json({
        msg: "releases has been deleted"
      });
    } catch (error) {
      res.status(400).send({
        msg: "An error occured",
        error
      });
    }
  },
  async CronJob() {
    cron.schedule("* * * * *", () => {
      StartBotForRelease();
    });
  }
};
