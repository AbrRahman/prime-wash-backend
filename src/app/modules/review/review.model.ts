import mongoose, { Schema } from "mongoose";
import TReview from "./review.interface";

const reviewSchema = new Schema<TReview>({
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    trim: true,
    ref: "user",
  },
  rating: {
    type: Number,
    required: true,
    trim: true,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
  },
});

const ReviewModel = mongoose.model<TReview>("review", reviewSchema);
export default ReviewModel;
