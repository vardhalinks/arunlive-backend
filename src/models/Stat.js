const mongoose = require("mongoose");

const StatSchema = new mongoose.Schema({
  value: String,
  label: String,
  order: Number
}, { timestamps: true });

module.exports = mongoose.model("Stat", StatSchema);
