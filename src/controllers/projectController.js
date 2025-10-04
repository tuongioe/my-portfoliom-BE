import pool from "../config/db.js";

// Thêm Project
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

// Lấy danh sách Projects
export const getProjects = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM projects ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📝 Sửa Project
export const updateProject = async (req, res) => {
  const { id } = req.params;
  const { preview, link, name, tech_icons } = req.body;

  try {
    const result = await pool.query(
      `UPDATE projects 
       SET preview = $1, link = $2, name = $3, tech_icons = $4 
       WHERE id = $5 RETURNING *`,
      [preview, link, name, tech_icons, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Xoá Project
export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM projects WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
