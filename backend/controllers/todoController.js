const pool = require("../database/db");

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

  try {
    const result = await pool.query(`INSERT INTO todo ()`);

    res.json(result);
  } catch (error) {
    res.json({
      status: "fail",
      detail: e,
    });
  }
};
