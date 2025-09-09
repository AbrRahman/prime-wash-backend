import express from "express";
import validationRequest from "../../middleware/validationRequest";
import reviewValidation from "./review.validation";
import reviewController from "./review.controller";
import auth from "../../middleware/auth";

const router = express.Router();

// review create router
router.post(
  "/",
  auth("admin", "user"),
  validationRequest(reviewValidation.createReviewValidationSchema),
  reviewController.createReview
);

// get all review router
router.get("/", reviewController.getAllReview);

const reviewRouter = router;
export default reviewRouter;
