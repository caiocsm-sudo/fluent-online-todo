const router = require("express").Router();
const todoController = require("./controllers/todoController.js");
const userController = require('./controllers/userController.js');

router
  .route("/todos")
  .get(todoController.getTodos)
  .post(todoController.postTodo);

router
  .route("/todos/:email")
  .get(todoController.getTodos);

router
  .route("/todos/:id")
  .get(todoController.getTodoByID)
  .patch(todoController.editTodo)
  .delete(todoController.deleteTodo);

router
  .route("/user/register")
  .post(userController.registerUser);

module.exports = router;
