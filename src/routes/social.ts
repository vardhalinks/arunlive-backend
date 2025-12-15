import express from "express";
import {
  getAllSocials,
  getSocialById,
  createSocial,
  updateSocial,
  deleteSocial,
} from "../controllers/socialController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllSocials);
router.get("/:id", getSocialById);
router.post("/", auth, createSocial);
router.put("/:id", auth, updateSocial);
router.delete("/:id", auth, deleteSocial);

export default router;
