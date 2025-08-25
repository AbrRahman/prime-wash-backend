import mongoose, { Schema } from "mongoose";
import TSlot from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "service",
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    isBooked: {
      type: String,
      enum: ["available", "booked"],
      trim: true,
      default: "available",
    },
  },
  { timestamps: true }
);

const SlotModel = mongoose.model<TSlot>("slot", slotSchema);

export default SlotModel;
