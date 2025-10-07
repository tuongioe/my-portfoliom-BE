import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL chưa được cấu hình");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool
  .connect()
  .then(() => console.log("✅ Kết nối Supabase thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối Supabase:", err));

export default pool;
