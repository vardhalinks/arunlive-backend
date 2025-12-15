import express from "express";
import {
  getAllStats,
  getStatById,
  createStat,
  updateStat,
  deleteStat,
} from "../controllers/statController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllStats);
router.get("/:id", getStatById);
router.post("/", auth, createStat);
router.put("/:id", auth, updateStat);
router.delete("/:id", auth, deleteStat);

export default router;
