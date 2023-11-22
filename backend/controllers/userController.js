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
      res.json({
        status: "success",
        message: "User created successfully",
        data: result,
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
  const { email, password } = req.body;
  try {
    console.table({ email, password });
    const user = new User('', email, password);

    const loggedUser = await user.login();

    console.log(loggedUser);

    if (loggedUser) {
      const accessToken = jwt.sign(username, process.env.TOKEN_SECRET);
      res.json({
        status: 'success',
        data: { loggedUser, accessToken },
      });
    }
  } catch (error) {
    res.json({
      status: 'fail',
      detail: error,
    });
  }
};
