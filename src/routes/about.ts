import express from "express";
import {
  getAllAbout,
  getAboutById,
  createAbout,
  updateAbout,
  deleteAbout,
} from "../controllers/aboutController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllAbout);
router.get("/:id", getAboutById);
router.post("/", auth, createAbout);
router.put("/:id", auth, updateAbout);
router.delete("/:id", auth, deleteAbout);

export default router;
