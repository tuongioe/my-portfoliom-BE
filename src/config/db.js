import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // cần cho Supabase
  },
});

pool
  .connect()
  .then(() => console.log("✅ Kết nối Supabase thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối Supabase:", err));
export default pool;
