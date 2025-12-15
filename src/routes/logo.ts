import express from "express";
import {
  getAllLogos,
  getLogoById,
  createLogo,
  updateLogo,
  deleteLogo,
} from "../controllers/logoController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllLogos);
router.get("/:id", getLogoById);
router.post("/", auth, createLogo);
router.put("/:id", auth, updateLogo);
router.delete("/:id", auth, deleteLogo);

export default router;
