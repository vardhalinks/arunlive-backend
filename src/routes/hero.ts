import express from "express";
import {
  getAllHeroes,
  getHeroById,
  createHero,
  updateHero,
  deleteHero,
} from "../controllers/heroController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllHeroes);
router.get("/:id", getHeroById);
router.post("/", auth, createHero);
router.put("/:id", auth, updateHero);
router.delete("/:id", auth, deleteHero);

export default router;
