import mongoose, { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser {
  email: string;
  password: string;
  role: string;
  _id?: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" }, //enum is to make choices or to put choices that only can be used
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = models?.User || model<IUser>("User", userSchema); // if models.User exists, use it, otherwise create a new model
export default User;
