import mongoose, { Document, Schema } from "mongoose";

export interface IFeatured extends Document {
  product_id: string;
}

const featuredSchema = new Schema<IFeatured>(
  {
    product_id: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IFeatured>("Featured", featuredSchema);