import mongoose, { Schema } from "mongoose";
import { describe } from "node:test";
import TService from "./service.interface";
import { boolean } from "zod";

const serviceSchema = new Schema<TService>({
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
});

const ServiceModel = mongoose.model<TService>("service", serviceSchema);

export default ServiceModel;
