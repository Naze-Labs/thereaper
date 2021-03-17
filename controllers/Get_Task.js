const EggBot = require("./../stores/NewEgg/bot");
let async = require("async");
let b = require("./../app");
let { mySqlConnection } = b;

module.exports = (res, req) => {
  mySqlConnection.query(
    "SELECT * FROM Employee WHERE EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) {
        res.status(400).json({ rows });
      } else {
        res.status(400).json({ err });
      }
    }
  );
};
