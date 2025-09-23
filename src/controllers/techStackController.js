import pool from "../config/db.js";

export const addTechStack = async (req, res) => {
  const { icon, name, type } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tech_stacks (icon, name, type) VALUES ($1, $2, $3) RETURNING *",
      [icon, name, type]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getTechStacks = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tech_stacks");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
