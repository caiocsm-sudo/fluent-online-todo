const pool = require("../database/db");

// Home route

export const home = (req, res) => {
  res.json("se foder né não c.h.i.");
};

export const postTodo = async (req, res) => {
  const { id, title, description, progress, completed, date } = req.body;

  try {
    const result = await pool.query(`INSERT INTO todo ()`);

    res.json(result);
  } catch (error) {
    res.json({
      status: 'fail',
      detail: e
    });
  }
};
