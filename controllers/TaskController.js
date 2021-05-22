const EggBot = require("./../stores/NewEgg/bot");
let async = require("async");
const {
  createTaskValidator,
  updateTaskValidator,
} = require("./../helpers/validators/tasks");
const Task = require("../models/Task");
module.exports = {
  async CreateTask(req, res) {
    let release = req.params.id;
    let { error } = createTaskValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let { _id } = req.decoded;
        let {
          billingAddress,
          shippingAddress,
          email,
          password,
          item_url,
          ccv,
          product_name,
          card,
          size,
          countdown,
        } = req.body;
        let task = {
          billingAddress,
          shippingAddress,
          creator: _id,
          release,
          email,
          password,
          item_url,
          ccv,
          product_name,
          card,
          size,
          countdown,
        };
        let newTask = new Task(task);
        let saveTask = await newTask.save();
        await res.status(200).json({
          msg: "task has been created",
          data: saveTask,
        });
      } catch (error) {
        console.log({ error: JSON.stringify(error) });
        await res.status(401).json({
          msg: "task creation unsuccessful",
        });
      }
  },

  async UpdateTask(req, res) {
    let {
      billingAddress,
      machine,
      shippingAddress,
      email,
      password,
      item_url,
      ccv,
      product_name,
      card,
      size,
      countdown,
    } = req.body;
    console.log({ body: req.body });
    let { error } = updateTaskValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else
      try {
        let task = await Task.findById(req.params.id);
        task.machine = (await machine) || task.machine;
        task.size = (await size) || task.size;
        task.countdown = (await countdown) || task.countdown;
        task.card = (await card) || task.card;
        task.shippingAddress = (await shippingAddress) || task.shippingAddress;
        task.billingAddress = (await billingAddress) || task.billingAddress;
        task.product_name = (await product_name) || task.product_name;
        task.password = (await password) || task.password;
        task.email = (await email) || task.email;
        task.item_url = (await item_url) || task.item_url;
        task.ccv = (await ccv) || task.ccv;
        let saveTask = await task.save();
        await res.status(200).json({
          msg: "task has been updated",
          data: saveTask,
        });
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          err: error,
        });
      }
  },

  async deleteTask(req, res) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      await res.status(200).json({
        msg: "task has been deleted",
      });
    } catch (error) {
      res.status(400).json({
        msg: "An error occured",
        err: error,
      });
    }
  },

  async getAllTask(req, res) {
    try {
      let data = await Task.find({});
      await res.status(200).json({
        msg: "task retrieved successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: "An error occured",
        error,
      });
    }
  },
  async getReleaseTask(req, res) {
    try {
      let data = await Task.find({ release: req.params.id });
      await res.status(200).json({
        msg: "task retrieved successfully",
        data,
      });
    } catch (error) {
      res.status(400).json({
        msg: "An error occured",
        error,
      });
    }
  },

  async TaskRunner({ body }, res) {
    let data = Task.find({ release: req.params.id });

    let { countdown } = body;
    let inputs = data;
    console.log({ inputs });

    if (Array.isArray(inputs) === false) {
      console.log("No input");
      return res.status(400).json({
        message: "Inputs can not be empty",
      });
    } else if (inputs.length < 1) {
      console.log("less than 1");
      return res.status(400).json({
        message: "Inputs can not be empty",
      });
    } else
      try {
        // if (store === "EggBot") {
        let multiBots = inputs.map(
          (input) =>
            function (callback) {
              let input_with_countdown = {
                ...input,
                countdown,
              };
              console.log({ countdown });
              EggBot(callback, input_with_countdown);
            }
        );
        setTimeout(() => {
          async.parallel(multiBots, function (err, result) {
            if (err) {
              return res.status(400).json({
                message: "Internal Error",
              });
            } else {
              console.log(result);
              res.status(200).json({
                result,
              });
            }
          });
        });
        // }
      } catch (error) {
        console.log({ error });
        return res.status(400).json({
          message: "Internal Error",
        });
      }
  },
};
