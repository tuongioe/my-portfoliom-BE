import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import serverlessExpress from "@vendia/serverless-express";

import authRoutes from "./src/routes/authRoutes.js";
import techStackRoutes from "./src/routes/techStackRoutes.js";
import projectRoutes from "./src/routes/projectRoutes.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: ["https://tuong-portfolio.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json());

// Các routes
app.use("/api/auth", authRoutes);
app.use("/api/techstacks", techStackRoutes);
app.use("/api/projects", projectRoutes);

app.get("/", (req, res) => {
  res.send("🚀 Backend is running on Vercel!");
});

export default serverlessExpress({ app });
