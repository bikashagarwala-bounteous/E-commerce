import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  product_image: string;
}

const productSchema = new Schema<IProduct>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    product_image: { type: String, required: true },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", productSchema);
