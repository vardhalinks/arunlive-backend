import mongoose, { Schema, Document } from "mongoose";

export interface ILogo extends Document {
  url: string;
  alt: string;
  company: string;
  createdAt: Date;
  updatedAt: Date;
}

const logoSchema = new Schema<ILogo>(
  {
    url: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
    },
    company: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ILogo>("Logo", logoSchema);
