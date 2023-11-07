const router = require("express").Router();
const todoController = require("./controllers/todoController.js");

router.route('/').get(todoController.home);

router.route('/todos').get(todoController.getTodos);

module.exports = router;
