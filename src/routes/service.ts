import express from "express";
import {
  getAllServices,
  getServiceById,
  createService,
  updateService,
  deleteService,
} from "../controllers/serviceController";
import { auth } from "../middleware/auth";

const router = express.Router();

router.get("/", getAllServices);
router.get("/:id", getServiceById);
router.post("/", auth, createService);
router.put("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

export default router;
