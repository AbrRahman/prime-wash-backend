import mongoose, { Schema } from "mongoose";
import TService from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    description: {
      type: String,
      require: true,
      trim: true,
    },
    price: {
      type: Number,
      require: true,
      trim: true,
    },
    duration: {
      type: String,
      require: true,
      trim: true,
    },
    image: {
      type: String,
      require: true,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const ServiceModel = mongoose.model<TService>("service", serviceSchema);

export default ServiceModel;
