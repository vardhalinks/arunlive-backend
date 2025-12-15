const mongoose = require("mongoose");

const heroSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  cta1Text: String,
  cta1Link: String,
  cta2Text: String,
  cta2Link: String,
  image: String,
  textColor: String,
  bgColor: String,
  cardBgColor: String,
  circleBgColor: String
}, { timestamps: true });

module.exports = mongoose.model("Hero", heroSchema);
