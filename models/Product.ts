import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IProject {}
const imageVariantSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["SQUARE", "WIDE", "PORTRAIT"],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    license: {
      type: String,
      required: true,
      enum: ["PERSONAL", "COMMERCIAL"],
    },
  },
  { timestamps: true }
);

const productSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    variant: [imageVariantSchema],
  },
  { timestamps: true }
);

const Product = models?.Product || model<IProject>("Product", productSchema);
export default Product;
