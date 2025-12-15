const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../services/cloudinary");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const path = req.file.path;
    const result = await cloudinary.uploader.upload(path, { folder: "nextera" });
    fs.unlinkSync(path);
    res.json({ url: result.secure_url });
  } catch (err) {
    res.status(500).json({ message: "Upload failed", err });
  }
});

module.exports = router;
