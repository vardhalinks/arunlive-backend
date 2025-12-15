import mongoose from "mongoose";

const heroSchema = new mongoose.Schema({
  heading: String,
  subheading: String,
  cta1: String,
  cta2: String,
  heroImage: String
}, { timestamps: true });

export default mongoose.model("Hero", heroSchema);
