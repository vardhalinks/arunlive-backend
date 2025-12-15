import mongoose, { Schema, Document } from "mongoose";

export interface ISocial extends Document {
  platform: string;
  url: string;
  icon: string;
  createdAt: Date;
  updatedAt: Date;
}

const socialSchema = new Schema<ISocial>(
  {
    platform: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ISocial>("Social", socialSchema);
