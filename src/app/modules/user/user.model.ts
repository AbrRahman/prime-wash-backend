import mongoose, { Schema } from "mongoose";
import { TUser } from "./user.interface";
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
      select: 0,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    address: {
      type: String,
      trim: true,
      default: "",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// hashing password
userSchema.pre("save", async function (next) {
  try {
    const user = this;

    if (user.password && user.password?.length) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    next();
  } catch (err) {
    next(err as Error);
  }
});
// password update time password hashing
userSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate() as { password?: string };
  if (update?.password) {
    update.password = await bcrypt.hash(update.password, 10);
    this.setUpdate(update);
  }
});

//after retrieve password set empty
userSchema.post("save", async function (doc, next) {
  doc.password = "";
  next();
});
const UserModel = mongoose.model<TUser>("user", userSchema);
export default UserModel;
