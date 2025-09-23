import express from "express";
import { addProject, getProjects } from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addProject);
router.get("/", getProjects);

export default router;
