import express from "express";
import {
  getAllPricing,
  getPricingById,
  createPricing,
  updatePricing,
  deletePricing,
} from "../controllers/pricingController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllPricing);
router.get("/:id", getPricingById);
router.post("/", auth, createPricing);
router.put("/:id", auth, updatePricing);
router.delete("/:id", auth, deletePricing);

export default router;
