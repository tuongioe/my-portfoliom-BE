import pool from "../config/db.js";

export const addProject = async (req, res) => {
  const { preview, link, name, tech_icons } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO projects (preview, link, name, tech_icons) VALUES ($1, $2, $3, $4) RETURNING *",
      [preview, link, name, tech_icons]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
