import mongoose, { Schema, Document } from "mongoose";

export interface IFooter extends Document {
  copyright: string;
  description: string;
  links: Array<{
    label: string;
    url: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const footerSchema = new Schema<IFooter>(
  {
    copyright: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    links: [
      {
        label: String,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IFooter>("Footer", footerSchema);
