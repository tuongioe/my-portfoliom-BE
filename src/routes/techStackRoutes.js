import express from "express";
import {
  addTechStack,
  getTechStacks,
} from "../controllers/techStackController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addTechStack);
router.get("/", getTechStacks);

export default router;
