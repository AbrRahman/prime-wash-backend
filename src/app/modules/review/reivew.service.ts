import TReview from "./review.interface";
import ReviewModel from "./review.model";

// review create into db
const createReviewIntoDB = async (payload: TReview) => {
  const result = await ReviewModel.create(payload);
  return result;
};

//
const getAllReviewDB = async () => {
  const result = await ReviewModel.find({})
    .populate("user")
    .sort({ createdAt: -1 });
  return result;
};

// if need update or delete review
// update
// delete

const reviewService = {
  createReviewIntoDB,
  getAllReviewDB,
};
export default reviewService;
