import mongoose from "mongoose";

const pricingSchema = new mongoose.Schema({
  name: String,
  price: String,
  subtitle: String,
  features: [String],
  audience: [String],
  link: String,
  popular: { type: Boolean, default: false },
  order: Number
}, { timestamps: true });

export default mongoose.model("Pricing", pricingSchema);
