const express = require("express");
const router = express.Router();
const { getAbout, updateAbout } = require("../controllers/aboutController");
const { adminOnly } = require("../middleware/auth");

router.get("/", getAbout);
router.put("/", adminOnly, updateAbout);

module.exports = router;
