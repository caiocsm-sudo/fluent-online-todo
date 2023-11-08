const pool = require("../database/db");
const { v4: uuidv4 } = require("uuid");

// Home route

exports.home = (req, res) => {
  res.json("se foder né não c.h.i.");
};

exports.getTodoByID = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await pool.query("SELECT * FROM todo WHERE id = $1", [id]);
    res.json({
      status: "success",
      data: response,
    });
  } catch (error) {
    res.json({
      status: "fail",
      detail: error,
    });
  }
};

exports.getTodos = async (req, res) => {
  if (req.params.email) {
    const { email } = req.params;
    try {
      const result = await pool.query(
        "SELECT * FROM todo WHERE user_email = $1",
        [email]
      );
      res.json({ status: "success", data: result.rows });
    } catch (error) {
      console.log(error);
    }
  }
};

exports.postTodo = async (req, res) => {
  const { title, description, progress, completed, user_email, date } =
    req.body;

  let id = uuidv4();

  try {
    console.log(req.body, id);

    const result = await pool.query(
      `INSERT INTO todo (id, title, description, progress, completed, user_email, date) VALUEs ($1, $2, $3, $4, $5, $6, $7)`,
      [id, title, description, progress, completed, user_email, date]
    );

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

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
    res.json({
      status: "success",
      data: result.rows,
    });
  } catch (error) {
    res.json({
      status: "fail",
      detail: error,
    });
  }
};
