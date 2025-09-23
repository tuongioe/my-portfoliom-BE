import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query("SELECT * FROM admins WHERE username=$1", [
      username,
    ]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const admin = result.rows[0];

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" } // ✅ đúng là expiresIn chứ không phải expireIn
    );

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
