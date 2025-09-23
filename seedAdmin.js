// seedAdmin.js
import bcrypt from "bcrypt";
import pool from "./src/config/db.js"; // nếu file db.js ở folder khác thì điều chỉnh đường dẫn

const seed = async () => {
  try {
    const username = "tuong2502";
    const plainPassword = "tuongioe123";

    // hash password
    const hashed = await bcrypt.hash(plainPassword, 10);

    // chèn vào DB
    const sql = `INSERT INTO admins (username, password) VALUES ($1, $2) RETURNING *`;
    const { rows } = await pool.query(sql, [username, hashed]);

    console.log("Created admin:", rows[0]);
    await pool.end(); // đóng pool nếu muốn
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
};

seed();
