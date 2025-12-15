import express, { Request, Response } from "express";
import cloudinary from "../services/cloudinary";
import { auth } from "../middleware/auth";

const router = express.Router();

router.post("/", auth, async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file provided" });
    }

    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const dataURI = "data:" + req.file.mimetype + ";base64," + b64;

    const result = await cloudinary.uploader.upload(dataURI, {
      resource_type: "auto",
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: "Error uploading file", error });
  }
});

export default router;
