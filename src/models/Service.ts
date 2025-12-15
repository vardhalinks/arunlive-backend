import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  icon: String,
  title: String,
  description: String,
  order: Number
}, { timestamps: true });

export default mongoose.model("Service", serviceSchema);
