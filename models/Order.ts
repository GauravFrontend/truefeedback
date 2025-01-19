import { model, models, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variant: {
      type: {
        type: String,
        required: true,
        enum: ["SQUARE", "WIDE", "PORTRAIT"],
      },
      price: { type: Number, required: true, min: 0 },
      license: {
        type: String,
        required: true,
        enum: ["PERSONAL", "COMMERCIAL"],
      },
    },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
  },
  { timestamps: true }
);

const Order = models?.Order || model("Order", orderSchema);
export default Order;
