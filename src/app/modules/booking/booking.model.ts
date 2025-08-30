import mongoose, { Schema } from "mongoose";
import TBooking from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "user",
    },
    service: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "service",
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: true,
      trim: true,
      ref: "slot",
    },
    vehicleType: {
      type: String,
      trim: true,
    },
    vehicleBrand: {
      type: String,
      trim: true,
    },
    vehicleModel: {
      type: String,
      trim: true,
    },
    registrationPlate: {
      type: String,
      trim: true,
    },
    paymentStatus: {
      type: String,
      trim: true,
      default: "unpaid",
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model<TBooking>("booking", bookingSchema);

export default BookingModel;
