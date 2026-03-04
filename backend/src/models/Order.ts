import mongoose, { Document, Schema } from "mongoose";
import { Item } from "../types/ItemsType";

export interface IOrder extends Document {
  user_id: string;
  items: Item[];
  payment_method: "credit_card" | "paypal" | "cash_on_delivery";
  expected_delivery_date: Date;
  shipping_address: string;
  total_amount: number;
  status: "pending" | "completed" | "cancelled";
}

const orderSchema = new Schema<IOrder>(
  {
    user_id: { type: String, required: true },
    items: [
      {
        product_id: { type: String, required: true },
        quantity: { type: Number, required: true },
        total_price: { type: Number, required: true },
      },
    ],
    payment_method: {
      type: String,
      enum: ["credit_card", "paypal", "cash_on_delivery"],
      required: true,
    },
    expected_delivery_date: { type: Date, required: true },
    shipping_address: { type: String, required: true },
    total_amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IOrder>("Order", orderSchema);
