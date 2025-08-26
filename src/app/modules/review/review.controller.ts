import status from "http-status";
import catchAsync from "../../utils/catchAsync";
import reviewService from "./reivew.service";

// insert review data controller
const createReview = catchAsync(async (req, res, next) => {
  const result = await reviewService.createReviewIntoDB(req?.body);
  res.status(status.OK).json({
    success: true,
    message: "Review create successfully",
    data: result,
  });
});

// get all review controller
const getAllReview = catchAsync(async (req, res, next) => {
  const result = await reviewService.getAllReviewDB();
  res.status(status.OK).json({
    success: true,
    message: "Review get successfully",
    data: result,
  });
});

const reviewController = {
  createReview,
  getAllReview,
};

export default reviewController;
