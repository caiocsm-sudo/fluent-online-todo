const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.registerUser = async (req, res) => {
  let [username, user_email, password] = [
    req.body.username,
    req.body.email,
    req.body.password,
  ];

  try {
    console.table({ username, user_email, password });

    const user = new User(username, user_email, password);

    const result = user.register();

    if (user.errors.length >= 1) {
      res.json({
        error: [...user.errors],
      });
    } else {
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

exports.logInUser = async (req, res) => {
  const { user_email, password } = req.body;

  try {
    const user = new User(user_email, password);

    const loggedUser = await user.login();

    console.log(loggedUser);
  } catch (error) {
    res.json({
      status: 'fail',
      detail: error,
    });
  }
};
