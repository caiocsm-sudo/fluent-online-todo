const pool = require("../database/db");
const { v4: uuidv4 } = require('uuid');

// Home route

exports.home = (req, res) => {
  res.json("se foder né não c.h.i.");
};

exports.getTodos = (req, res) => {
  pool
    .query("SELECT * FROM todo")
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      res.json({
        status: "fail",
        detail: error,
      });
    });
};

exports.postTodo = async (req, res) => {
  const { id, title, description, progress, completed, date } = req.body;

  id = uuidv4();

  try {
    const result = await pool.query(`INSERT INTO todo (id, title, description, progress, completed, date) VALUEs ($1, $2, $3, $4, $5, $6)`, [id, title, description, progress, completed, date]);

    res.json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.json({
      status: "fail",
      detail: e,
    });
  }
};
