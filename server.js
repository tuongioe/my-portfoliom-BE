import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/routes/authRoutes.js";
import techStackRoutes from "./src/routes/techStackRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";

dotenv.config();

const app = express();

// ✅ Cấu hình CORS cho cả local và domain deploy
app.use(
  cors({
    origin: ["https://tuong-portfolio.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Đăng ký các routes
app.use("/api/auth", authRoutes);
app.use("/api/techstacks", techStackRoutes);
app.use("/api/projects", projectRoutes);

// ✅ Route kiểm tra server
app.get("/", (req, res) => {
  res.send("🚀 Backend is running successfully!");
});

// ✅ Khởi động server (chỉ dùng khi chạy local)
// ⚠️ Khi deploy lên Vercel, dòng này không thực sự chạy, Vercel sẽ tự handle
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// ✅ Debug database URL
console.log("DATABASE_URL =", process.env.DATABASE_URL);
