import express from "express";
import {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "../controllers/testimonialController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllTestimonials);
router.get("/:id", getTestimonialById);
router.post("/", auth, createTestimonial);
router.put("/:id", auth, updateTestimonial);
router.delete("/:id", auth, deleteTestimonial);

export default router;
