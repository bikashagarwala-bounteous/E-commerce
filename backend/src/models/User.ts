import mongoose, { Document, Schema } from "mongoose";

export type Role = "seller" | "buyer";

export type Address = {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
};

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  address?: Address[];
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["seller", "buyer"], required: true },
    address: [
      {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pincode: { type: String, required: true },
      },
    ],
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", userSchema);
