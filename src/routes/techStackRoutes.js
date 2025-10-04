import express from "express";
import {
  addTechStack,
  getTechStacks,
  updateTechStack,
  deleteTechStack,
} from "../controllers/techStackController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addTechStack);
router.get("/", getTechStacks);
router.put("/:id", verifyToken, updateTechStack);
router.delete("/:id", verifyToken, deleteTechStack);

export default router;
