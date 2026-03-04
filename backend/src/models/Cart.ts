import mongoose, { Document, Schema } from "mongoose";
import { Item } from "../types/ItemsType";

export interface ICart extends Document {
  user_id: string;
  items: Item[];
}

const cartSchema = new Schema<ICart>(
  {
    user_id: { type: String, required: true },
    items: [
      {
        product_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<ICart>("Cart", cartSchema);
