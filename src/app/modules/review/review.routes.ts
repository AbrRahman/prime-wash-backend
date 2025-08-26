import express from "express";
import validationRequest from "../../middleware/validationRequest";
import reviewValidation from "./review.validation";
import reviewController from "./review.controller";

const router = express.Router();

// review create router
router.post(
  "/",
  validationRequest(reviewValidation.createReviewValidationSchema),
  reviewController.createReview
);

// get all review router
router.get("/", reviewController.getAllReview);

const reviewRouter = router;
export default reviewRouter;
