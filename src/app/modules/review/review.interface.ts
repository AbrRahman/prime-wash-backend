import { Types } from "mongoose";

type TReview = {
  user: Types.ObjectId;
  rating: number;
  comment: string;
};

export default TReview;
