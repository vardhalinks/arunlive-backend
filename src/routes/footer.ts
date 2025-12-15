import express from "express";
import {
  getAllFooters,
  getFooterById,
  createFooter,
  updateFooter,
  deleteFooter,
} from "../controllers/footerController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllFooters);
router.get("/:id", getFooterById);
router.post("/", auth, createFooter);
router.put("/:id", auth, updateFooter);
router.delete("/:id", auth, deleteFooter);

export default router;
