const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  let [username, user_email, password] = [
    req.body.username,
    req.body.user_email,
    req.body.password,
  ];

  try {
    const user = new User(username, user_email, password);

    const result = user.register();

    if (result) {
      const accessToken = jwt.sign(username, process.env.TOKEN_SECRET);
      // not with the third parameter, which is an object that can contain an expiring time;

      res.json({
        status: "success",
        data: { result, accessToken },
      });
    }
  } catch (error) {
    res.json({
      status: "fail",
      detail: error,
    });
  }
};

exports.logInUser = async (req, res) => {};
