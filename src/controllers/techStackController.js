import pool from "../config/db.js";

// ➕ Thêm Tech Stack
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

// 📥 Lấy danh sách Tech Stack
export const getTechStacks = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM tech_stacks ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✏️ Sửa Tech Stack
export const updateTechStack = async (req, res) => {
  const { id } = req.params;
  const { icon, name, type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE tech_stacks 
       SET icon = $1, name = $2, type = $3 
       WHERE id = $4 RETURNING *`,
      [icon, name, type, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tech stack not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 🗑️ Xoá Tech Stack
export const deleteTechStack = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tech_stacks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Tech stack not found" });
    }

    res.json({ message: "Tech stack deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
