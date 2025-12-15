import mongoose from "mongoose";

const statSchema = new mongoose.Schema({
  value: String,
  label: String,
  order: Number
}, { timestamps: true });

export default mongoose.model("Stat", statSchema);
