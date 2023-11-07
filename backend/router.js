const router = require("express").Router();
const todoController = require("./controllers/todoController");

router
  .route("/")
  .get(todoController.home);

router
  .route("/todos")
  .get(todoController.getTodos)
  .post(todoController.postTodo);


