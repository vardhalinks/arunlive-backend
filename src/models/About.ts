import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema({
  title: String,
  paragraph1: String,
  paragraph2: String,
  image: String
}, { timestamps: true });

export default mongoose.model("About", aboutSchema);
