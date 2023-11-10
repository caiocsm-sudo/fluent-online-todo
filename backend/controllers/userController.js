const User = require("../models/user");

exports.createUser = async (req, res) => {
  let user = {
    username: req.body.username,
    user_email: req.body.user_email,
    password: req.body.password,
  };

  try {
  } catch (error) {
    res.json({
      status: "fail",
      detail: error,
    });
  }
};
