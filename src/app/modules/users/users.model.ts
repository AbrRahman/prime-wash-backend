import mongoose, { Schema } from "mongoose";
import { TUser } from "./users.interface";
import bcrypt from "bcrypt";

const userSchema = new Schema<TUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    image: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true }
);

// hashing password
userSchema.pre("save", async function (next) {
  try {
    const user = this;
    if (user.password && this.isModified(user.password)) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});

const UserModel = mongoose.model<TUser>("user", userSchema);
export default UserModel;
