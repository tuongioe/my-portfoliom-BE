import express from "express";
import {
  addProject,
  getProjects,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addProject);
router.get("/", getProjects);
router.put("/:id", verifyToken, updateProject);
router.delete("/:id", verifyToken, deleteProject);

export default router;
