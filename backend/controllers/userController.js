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

    // @params string {username, userEmail, password};
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
    const user = new User("", email, password);

    const logged = await user.login();

    const accessToken = jwt.sign(email, process.env.TOKEN_SECRET);

    console.log("user -> " + user.errors + "\nlogged -> " + logged.errors);

    // errors array being used for the first time
    if (logged.errors.length >= 1) throw new Error(user.errors);

    res.status(200).json({
      status: "success",
      data: { user, accessToken },
    });
  } catch (error) {
    res.json({
      status: "fail",
      error: `${error.toString().slice(7)}`,
    });
  }
};
