const User = require("../models/user");
const jsonwebtoken = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  let [username, user_email, password] = [
    req.body.username,
    req.body.user_email,
    req.body.password,
  ];

  try {
    const user = new User(username, user_email, password);

    const result = user.register();

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      detail: error,
    });
  }
};
