const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../config");

module.exports.Auth = {
  async verifyToken(req, resp, next) {
    const toker = await req.header("reaper-token");
    if (!toker) resp.status(401).send({ msg: "Access Denied" });
    else
      try {
        jwt.verify(toker, APP_SECRET, async (err, res) => {
          if (!err) {
            req.decoded = await res.user;
            next();
          } else {
            resp.status(400).json({ msg: "Invalid Token" });
          }
        });
      } catch (error) {
        resp.status(400).json({ msg: "Invalid Token" });
      }
  },
  async generateToken(user) {
    console.log("user", { user });
    return jwt.sign({ user }, APP_SECRET, { expiresIn: "24h" });
  },
};
