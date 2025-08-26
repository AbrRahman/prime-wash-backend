import z from "zod";

const createReviewValidationSchema = z.object({
  body: z.object({
    user: z.string().min(1, { message: "User id must be required" }),
    rating: z
      .number()
      .min(1, { message: "Rating must be at least 1" })
      .max(5, { message: "Rating cannot be more than 5" }),
    comment: z.string().min(1, { message: "Comment is required" }).trim(),
  }),
});

const reviewValidation = {
  createReviewValidationSchema,
};
export default reviewValidation;
