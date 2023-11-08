const router = require("express").Router();
const todoController = require("./controllers/todoController.js");

router
  .route("/todos")
  .get(todoController.getTodos)
  .post(todoController.postTodo);

router
  .route("/todos/:email")
  .get(todoController.getTodos);

router
  .route("/todos/:id")
  .get(todoController.getTodoByID);

module.exports = router;
