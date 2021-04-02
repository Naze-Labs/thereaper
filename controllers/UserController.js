const User = require("./../models/User");
const {
  registerValidator,
  loginValidator
} = require("./../helpers/validators/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../config/index");
const { Auth } = require("../helpers/middlewares/Auth");
// const { verifySigup } = require("../helper/sendMail").Mail;

const UserController = {
  async signUp(req, res) {
    const { error } = registerValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      try {
        const emailExist = await User.findOne({ email: req.body.email });
        if (emailExist)
          return res.status(400).json({ msg: "User with email already exist" });
        else {
          // let verifiedData = jwt.verify(token, APP_SECRET, (err, res) => res);
          let { password, full_name, email, phone, userType } = req.body;
          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          let start_auth = {
            full_name,
            email,
            phone,
            userType,
            password: hashedPassword
          };
          let newUser = new User(start_auth);
          await newUser.save();
          let user = await User.findOne({ email: req.body.email });
          let profile = user;
          if (!user) res.status(400).json({ msg: "Email not found" });
          else {
            user = await bcrypt.compare(req.body.password, user.password);
            if (!user) return res.status(400).json({ msg: "Invalid Password" });
            try {
              let token = await Auth.generateToken(profile);
              res.header("reaper-token", token).json({ profile, token });
            } catch (error) {
              res.send(400).json({ error });
            }
          }
        }
      } catch (error) {
        res.status(400).send({
          msg: "An error occured",
          err: error
        });
      }
    }
  },

  async login(req, res) {
    const { error } = loginValidator.validate(req.body);
    if (error) res.status(400).json({ msg: error.details[0].message });
    else {
      let user = await User.findOne({ email: req.body.email });
      let profile = user;
      if (!user) res.status(400).json({ msg: "Email not found" });
      else {
        user = await bcrypt.compare(req.body.password, user.password);
        if (!user) return res.status(400).json({ msg: "Invalid Password" });
        try {
          let token = await Auth.generateToken(profile);
          res.header("reaper-token", token).json({ profile, token });
        } catch (error) {
          res.send(400).json({ msg: "" });
        }
      }
    }
  }
};

module.exports = UserController;
